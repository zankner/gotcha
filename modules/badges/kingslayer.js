const admin = require('firebase-admin');

const kingslayer = (user) => {
	if (user.name === 'Danny Burke') {
		const userRef = admin.firestore().collection('users').doc(user.email).collection('private').doc('adminOnly');
		userRef.get().then(doc => {
			const hunter = doc.data();
			console.log(hunter.hunter);
			const hunterRef = admin.firestore().collection('users').doc(hunter.hunter).collection('private').doc('userOnly');
			hunterRef.update({
				badges: 'kingslayer'
			})
		})
	}
}

module.exports = kingslayer;
