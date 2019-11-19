import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

const LeaderboardCard = (props) => {
	const [leaderboard, setLeaderboard] = useState(null);

	useEffect(() => {
		const userCollection = props.firebase.firestore().collection('users');
		userCollection.where('tagged', '==', false).where('numTags', '>', 0).orderBy('numTags', 'desc').limit(10).get().then(querySnapshot => {
			const dupArray = querySnapshot.docs.map(doc => {
				return doc.data().numTags;
			});
			const distinctTags = [...new Set(dupArray)];
			distinctTags.sort((a, b) => b - a);
			setLeaderboard(querySnapshot.docs.map(doc => {
				const { name, numTags } = doc.data();
				const rank = distinctTags.indexOf(doc.data().numTags) + 1;
				return { numTags, name, rank };
			}));
		});
	}, []);

	if (!leaderboard) {
		return '';
	}

	return (
		<div className={props.className}>
			<div className="card">
				<div className="card-header header text-uppercase">Leaderboard</div>
				{leaderboard.length > 0 ? (
					<ul className="list-group list-group-flush">
						{leaderboard.map((player, index) => (
							<li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
								{player.rank}. {player.name}
								<span className="badge badge-secondary badge-pill">{player.numTags}</span>
							</li>
						))}
					</ul>
				) : (
					<div className="card-body">Nobody appears to be in the lead yet.</div>
				)}
			</div>
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
