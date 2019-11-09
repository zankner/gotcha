const express = require('express');
const path = require('path');
const router = express.Router();
const admin = require('firebase-admin');
const moment = require('moment');
const uniqid = require('uniqid');
const status = require('http-status');

router.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

router.post('/tag', (req, res) => {
	const token = req.body.token;

	if(!token){
		return res.sendStatus(status.NOT_ACCEPTABLE);
	}

	admin.auth().verifyIdToken(token).then(decodedToken => {
		const uid = decodedToken.email;
		const userRef = admin.firestore().collection('users').doc(uid);
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
					}).then(()=>{
						userRef.update({
							'tagged': true
						}).then(()=>{
							res.send(status.OK);
						})
					})
				})
			})
		})
	});
});

module.exports = router;
