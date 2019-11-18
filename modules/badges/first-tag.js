const admin = require('firebase-admin');

const firstTag = (user) => {
  const statsRef = admin.firestore().collection('stats').doc('badgeStats');
  statsRef.get().then(doc => {
    const data = doc.data();
    if (data.firstTag === true){
      const userRef = admin.firestore().collection('users').doc(user.email);
      userRef.collection('private').doc('userOnly').update({
        badges: admin.firestore.FieldValue.arrayUnion('firstOut')
      }).then(() => {
     	userRef.collection('private').doc('adminOnly').get().then( adminDoc => {
		adminData = adminDoc.data();
		const taggerRef = admin.firestore().collection('users').doc(adminData.hunter);
		taggerRef.collection('private').doc('userOnly').update({
			badges: admin.firestore.FieldValue.arrayUnion('firstTag')
		}).then(() => {
        		statsRef.update({
          			'firstTag': false
        		})
		})
	})
      })
    }
  })
}

module.exports = firstTag;
