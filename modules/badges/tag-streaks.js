const admin = require('firebase-admin');

const tagStreak = (user, data) => {
  const tags = user.tags;
  if(tags.length == 5){
    const userRef = admin.firestore().collection('users').doc(user.email);
    userRef.update({
      "badges.tagStreak": 5
    });
  }
  else if(tags.length == 10){
    const userRef = admin.firestore().collection('users').doc(user.email);
    userRef.update({
      "badges.tagStreak": 10 
    });
  }
  else if(tags.length == 20){
    const userRef = admin.firestore().collection('users').doc(user.email);
    userRef.update({
      "badges.tagStreak": 20
    });
  }
  else if(tags.length == 30){
    const userRef = admin.firestore().collection('users').doc(user.email);
    userRef.update({
      "badges.tagStreak": 30
    });
  }
}

module.exports = tagStreak;
