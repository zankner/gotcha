import React, { useEffect, useState } from 'react';
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
				if (statsData[uniqueTag] !== 0) {
					validKeys.push(parseInt(uniqueTag, 10));
				}
			});

			validKeys.sort((a, b) => {
				return b - a;
			});

			const userRef = props.firebase.firestore().collection('users');
			userRef.where('tagged', '==', false).orderBy('numTags', 'desc').get().then(snapshot => {
				setLeaderboard(snapshot.docs.map(doc => {
					const { name, numTags } = doc.data();
					const rank = validKeys.indexOf(numTags) + 1;

					return { numTags, name, rank };
				}));
			});
		});
	}, []);

	if (!leaderboard) {
		return '';
	}

	return (
		<div className="card">
			<div className="card-header header text-uppercase">Leaderboard</div>
			<ul className="list-group list-group-flush">
				{leaderboard.map((player, index) => (
					<li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
						{player.rank}. {player.name}
						<span className="badge badge-secondary badge-pill">{player.numTags}</span>
					</li>
				))}
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
