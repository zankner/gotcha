import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

const ProfileCard = props => {
	const [profile, setProfile] = useState(null);
	const [target, setTarget] = useState(null);
	const [tags, setTags] = useState(null);
	const [rank, setRank] = useState(null);

	useEffect(() => {
		if (props.auth.isLoaded) {
			const userRef = props.firebase.firestore().collection('users').doc(props.auth.email);
			userRef.get().then(userDoc => {
				setProfile(userDoc.data());
				setTarget(null); // TODO: set target from database
				setTags(null); // TODO: set tags from database
				setRank(null); // TODO: set rank from database
			});
		}
	});

	if (!profile) {
		return '';
	}

	return (
		<div className="card justify-content-center">
			<div className="card-header header text-uppercase">Profile</div>
			<div className="card-body p-4">
				<div className="row mb-4 mb-lg-0 h-100 mb-lg-auto d-flex align-items-center">
					<div className="col-2 col-lg-3">
						<img src={profile.photoURL} className="rounded-circle w-100 img-thumbnail" alt="" />
					</div>
					<div className="col-10 col-lg-9 h-100 d-flex align-items-center pl-0">
						<div>
							<h2 className="mb-0 font-weight-bold text-uppercase">{profile.name}</h2>
							<span>{profile.email}</span>
						</div>
					</div>
				</div>
				<hr />
				<button className="btn btn-primary btn-lg btn-block">Tag out</button>
				<hr />
				<div className="row">
					<div className="col">
						<div className="card">
							<ul className="list-group list-group-flush">
								<li className="list-group-item"><strong>Target:</strong> {target || 'Loading...'}</li>
								<li className="list-group-item"><strong>Tags:</strong> {tags || 'Loading...'}</li>
								<li className="list-group-item"><strong>Rank:</strong> {rank || 'Loading...'}</li>
							</ul>
						</div>
					</div>
				</div>
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
)(ProfileCard);
