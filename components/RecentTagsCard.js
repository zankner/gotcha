import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

const RecentTagsCard = props => {
	const [recentTags, setRecentTags] = useState([]);

	useEffect(() => {
		const tagRef = props.firebase.firestore().collection('tags');
		tagRef.orderBy('timestamp', 'desc').limit(5).get().then(querySnapshot => {
			setRecentTags(querySnapshot.docs.map(doc => {
				const { name, timestamp, lastWords } = doc.data();
				return { name, timestamp, lastWords };
			}));
		});
	}, []);

	return (
		<div className={props.className}>
			<div className="card">
				<div className="card-header header text-uppercase">Recent Tags</div>

				{recentTags.length > 0 ? (
					<ul className="list-group list-group-flush">
						{recentTags.map(tag => (
							<li className="list-group-item flex-column align-items-start" key={tag.timestamp}>
								<div className="d-flex w-100 justify-content-between">
									<h5 className="mb-1 font-weight-bold">{tag.name}</h5>
									<small className="text-muted">{moment(tag.timestamp).fromNow()}</small>
								</div>
								<p className="text-muted mb-0 mt-1">{tag.lastWords.length ? tag.lastWords : <i>No last words</i>}</p>
							</li>
						))}
					</ul>
				) : (
					<div className="card-body">No tags yet. Let's get cracking.</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	auth: state.firebase.auth
});

export default compose(
	connect(mapStateToProps),
	withFirebase,
	withRouter
)(RecentTagsCard);
