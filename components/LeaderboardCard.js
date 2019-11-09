import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

const LeaderboardCard = (props) => {
	const [leaderboard, setLeaderboard] = useState([]);

	useEffect(() => {
		const statsRef = props.firebase.firestore().collection('stats').doc('uniqueTags');
		statsRef.get().then(statsDoc => {
			const statsData = statsDoc.data();
			const validKeys = [];
			Object.keys(statsData).forEach(uniqueTag => {
				if(statsData[uniqueTag] !== 0){
					validKeys.push(uniqueTag);
				}
			});
			validKeys.sort((a,b) => {return b-a});
			const userRef = props.firebase.firestore().collection('users');
			userRef.where("tagged", "==", false).orderBy("numTags", "desc").get().then(snapshot => {
				setLeaderboard(snapshot.docs.map(doc => {
					const {name, numTags} = doc.data();
					const rank = validKeys.indexOf(numTags) + 1;
					return {[name]: {numTags, rank}}
				}));
			});
		});

	}, []);

	return (
		<div className="card">
			<div className="card-header header text-uppercase">Leaderboard</div>
			<ul className="list-group list-group-flush">
				<li className="list-group-item">1. Zack Ankner</li>
				<li className="list-group-item">2. Ben Botvinick</li>
				<li className="list-group-item">3. Max Litvak</li>
				<li className="list-group-item">4. Runpeng Liu</li>
				<li className="list-group-item">5. Ned Sahin</li>
				<li className="list-group-item">6. Mr. Pratt</li>
				<li className="list-group-item">7. Mr. Ball</li>
				<li className="list-group-item">8. Zaney Bookbinder</li>
				<li className="list-group-item">9. Technical Tom</li>
				<li className="list-group-item">10. Mr. Hales</li>
			</ul>
		</div>
	);
};

const mapStateToProps = state => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile
});

export default compose(
	connect(mapStateToProps),
	withFirebase,
	withRouter
)(LeaderboardCard);
