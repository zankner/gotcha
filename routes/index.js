const express = require('express');
const path = require('path');
const router = express.Router();
const admin = require('firebase-admin');
const uniqid = require('uniqid');
const status = require('http-status');
const badgeCheck = require('../modules/badges');

router.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

router.post('/tag', (req, res) => {
	const token = req.body.token;
	const lastWords = req.body.lastWords;

	if (!token || !lastWords) {
		return res.sendStatus(status.NOT_ACCEPTABLE);
	}

	admin.auth().verifyIdToken(token).then(decodedToken => {
		const uid = decodedToken.email;
		const userRef = admin.firestore().collection('users').doc(uid);

		userRef.get().then(userDoc => {
			const user = userDoc.data();
			if (user.tagged) {
				return res.sendStatus(status.UNAUTHORIZED);
			}

			userRef.collection('private').doc('userOnly').get().then(userOnlyDoc => {
				const userOnly = userOnlyDoc.data();

				userRef.collection('private').doc('adminOnly').get().then(adminOnlyDoc => {
					const adminOnly = adminOnlyDoc.data();
					const hunterUid = adminOnly.hunter;
					const hunterRef = admin.firestore().collection('users').doc(hunterUid);

					hunterRef.update({
						'numTags': admin.firestore.FieldValue.increment(1)
					}).then(() => {
						hunterRef.collection('private').doc('userOnly').update({
							'target': userOnly.target
						}).then(() => {
							userRef.update({
								'tagged': true
							}).then(() => {
								const tagId = uniqid();
								const tagRef = admin.firestore().collection('tags').doc(tagId);
								const timestamp = Date.now();

								tagRef.set({
									timestamp: timestamp,
									lastWords: lastWords,
									name: user.name,
									tagged: uid
								}).then(() => {
									hunterRef.collection('private').doc('userOnly').update({
										tags: admin.firestore.FieldValue.arrayUnion({ [timestamp]: tagRef })
									}).then(() => {
										const statsRef = admin.firestore().collection('stats').doc('sumTags');

										hunterRef.get().then((hunterDoc) => {
											statsRef.update({
												[hunterDoc.data().class]: admin.firestore.FieldValue.increment(1)
											}).then(() => {
												admin.firestore().collection('users').doc(userOnly.target).collection('private').doc('adminOnly').update({
													hunter: hunterUid
												}).then(() => {
													console.log(typeof badgeCheck.firstTag);
													badgeCheck.firstTag(user);
													badgeCheck.tagStreak(hunterDoc.data());
													badgeCheck.kingslayer(user);
													res.sendStatus(status.OK);
												});
											}).catch(() => {
												return res.sendStatus(status.INTERNAL_SERVER_ERROR);
											});
										}).catch(() => {
											return res.sendStatus(status.INTERNAL_SERVER_ERROR);
										});
									}).catch(() => {
										return res.sendStatus(status.INTERNAL_SERVER_ERROR);
									});
								}).catch(() => {
									return res.sendStatus(status.INTERNAL_SERVER_ERROR);
								});
							}).catch(() => {
								return res.sendStatus(status.INTERNAL_SERVER_ERROR);
							});
						}).catch(() => {
							return res.sendStatus(status.INTERNAL_SERVER_ERROR);
						});
					}).catch(() => {
						return res.sendStatus(status.INTERNAL_SERVER_ERROR);
					});
				}).catch(() => {
					return res.sendStatus(status.INTERNAL_SERVER_ERROR);
				});
			}).catch(() => {
				return res.sendStatus(status.INTERNAL_SERVER_ERROR);
			});
		}).catch(() => {
			return res.sendStatus(status.INTERNAL_SERVER_ERROR);
		});
	}).catch(() => {
		return res.sendStatus(status.INTERNAL_SERVER_ERROR);
	});
});

module.exports = router;
