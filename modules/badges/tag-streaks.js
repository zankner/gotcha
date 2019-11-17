const admin = require('firebase-admin');

const tagStreak = (user) => {
	const userOnlyRef = admin.firestore().collection('users').doc(user.email).collection('private').doc('userOnly')
	userOnlyRef.get().then(userOnlyDoc => {
		const tags = userOnlyDoc.data().tags;
 	 	if(tags.length == 5){
 	 	  userOnlyRef.update({
			  badges: admin.firestore.FieldValue.arrayUnion('5')
 	 	  });
 	 	}
 	 	else if(tags.length == 10){
 	 	  const userRef = admin.firestore().collection('users').doc(user.email);
 	 	  userOnlyRef.update({
			  badges: admin.firestore.FieldValue.arrayUnion('10')
 	 	  });
 	 	}
 	 	else if(tags.length == 20){
 	 	  const userRef = admin.firestore().collection('users').doc(user.email);
 	 	  userOnlyRef.update({
			  badges: admin.firestore.FieldValue.arrayUnion('20')
 	 	  });
 	 	}
	});
}

module.exports = tagStreak;
