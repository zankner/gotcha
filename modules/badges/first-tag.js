const admin = require('firebase-admin');

const firstTag = (user) => {
  const statsRef = admin.firestore().collection('stats').doc('badgeStats');
  statsRef.get().then(doc => {
    const data = doc.data();
    if (data.firstTag === true){
      const userRef = admin.firestore().collection('users').doc(user.email);
      userRef.update({
        'badges.firstTag': true
      }).then(() => {
        statsRef.update({
          'firstTag': false
        }) 
      })
    }
  })
}

module.exports = firstTag;
