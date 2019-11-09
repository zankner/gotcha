import React from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

const LeaderboardCard = () => {
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
