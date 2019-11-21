const express = require('express');
const path = require('path');
const router = express.Router();
const admin = require('firebase-admin');
const status = require('http-status');
const Queue = require('bull');

// Create work queue
const tagQueue = new Queue('tag', process.env.REDIS_URL || 'redis://127.0.0.1:6379');

// router.get('/hoose', (req, res) => {
// 	const userCollection = admin.firestore().collection('users');
// 	userCollection.where('tagged', '==', false).get().then(querySnapshot => {
// 		const players = querySnapshot.docs.map(doc => {
// 			return doc.data().name;
// 		});
//
// 		res.send(players);
// 	}).catch(() => {
// 		return res.sendStatus(status.INTERNAL_SERVER_ERROR);
// 	});
// });
//
// router.get('/tags', (req, res) => {
// 	const userCollection = admin.firestore().collection('tags');
// 	userCollection.get().then(querySnapshot => {
// 		const tags = querySnapshot.docs.map(doc => {
// 			return doc.data();
// 		});
//
// 		res.send(tags);
// 	}).catch(() => {
// 		return res.sendStatus(status.INTERNAL_SERVER_ERROR);
// 	});
// });

router.get('/job/:id', async (req, res) => {
	const id = req.params.id;
	const job = await tagQueue.getJob(id);

	if (job === null) {
		res.status(404).end();
	} else {
		let state = await job.getState();
		let progress = job._progress;
		let reason = job.failedReason;
		res.json({ id, state, progress, reason });
	}
});

router.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

router.post('/tag', (req, res) => {
	const token = req.body.token;
	const lastWords = req.body.lastWords;

	if (!token || !lastWords) {
		return res.sendStatus(status.BAD_REQUEST);
	}

	admin.auth().verifyIdToken(token).then(async decodedToken => {
		const uid = decodedToken.email;
		const job = await tagQueue.add({ uid, lastWords });
		res.json({ id: job.id });
	}).catch(() => {
		return res.sendStatus(status.UNAUTHORIZED);
	});
});

module.exports = router;
