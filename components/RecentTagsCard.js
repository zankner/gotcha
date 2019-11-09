import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

const RecentTagsCard = () => {
	const [recentTags, setRecentTags] = useState([]);

	useEffect(() => {

	}, []);

	return (
		<div className="card">
			<div className="card-header header text-uppercase">Recent Tags</div>
			<ul className="list-group list-group-flush">
				<li className="list-group-item flex-column align-items-start">
					<div className="d-flex w-100 justify-content-between">
						<h5 className="mb-1 font-weight-bold">Runpeng Liu</h5>
						<small className="text-muted">3 mins ago</small>
					</div>
					<p className="text-muted mb-0 mt-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
				</li>
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
)(RecentTagsCard);
