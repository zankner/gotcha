const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../public/index.html'));
});


router.post('/tag', (req, res) => {
	const token = req.body.token;
	const lastWords = req.body.lastWords;

	if(!token || !lastWords){
		return res.sendStatus(status.NOT_ACCEPTABLE);
	}

	admin.auth().verifyIdToken(token).then(decodedToken => {
		const uid = decodedToken.email;
		const userRef = admin.firestore().collection('users').doc(uid);
		userRef.get().then(userDoc => {
			const user = userDoc.data();
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
								}).then(()=> {
									userRef.collection('private').doc('userOnly').update({
										tags: {[timestamp]:tagRef}
									}).then(() => {
										const uniqueRef = admin.firestore().collection('stats').doc('uniqueTags');
										hunterRef.get().then((hunterDoc) => {
											const hunterData = hunterDoc.data();
											uniqueRef.update({
												[hunterData.numTags]: admin.firestore.FieldValue.increment(1),
												[hunterData.numTags-1]: admin.firestore.FieldValue.increment(-1),
											}).then(() => {
												res.sendStatus(status.OK);
											})
										});
									})
								})
							})
						})
					})
				})
			})
		});
	});
});

module.exports = router;
