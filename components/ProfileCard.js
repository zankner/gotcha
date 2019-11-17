import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

const ProfileCard = props => {
	const [profile, setProfile] = useState(null);
	const [target, setTarget] = useState('Loading...');
	const [numTags, setNumTags] = useState('Loading...');
	const [rank, setRank] = useState('Loading...');
	const [badges, setBadges] = useState([]);

	useEffect(() => {
		$('[data-toggle="tooltip"]').tooltip();
	});

	useEffect(() => {
		if (props.auth.isLoaded) {
			const userRef = props.firebase.firestore().collection('users').doc(props.auth.email);
			userRef.get().then(userDoc => {
				setProfile(userDoc.data());
				setNumTags(userDoc.data().numTags);
				const userCollection = props.firebase.firestore().collection('users');
				userCollection.where('tagged', '==', false).orderBy('numTags', 'desc').get().then(querySnapshot => {
					const dupArray = querySnapshot.docs.map(doc => {
						return doc.data().numTags;
					});
					const distinctTags = [...new Set(dupArray)];
					distinctTags.sort((a, b) => b - a);
					setRank(distinctTags.indexOf(userDoc.data().numTags) + 1);
				});
			});

			const userOnlyRef = userRef.collection('private').doc('userOnly');
			userOnlyRef.get().then(userOnlyDoc => {
				const userOnly = userOnlyDoc.data();
				setBadges(userOnly.badges);

				const targetRef = props.firebase.firestore().collection('users').doc(userOnly.target);
				targetRef.get().then(targetDoc => {
					setTarget(targetDoc.data().name);
				});
			});
		}
	}, [props.auth]);

	const tagOut = () => {
		props.history.push('/?modal=lastWordsModal');
		new Audio('/audio/recorder.mp3').play()
	};

	if (!profile) {
		return '';
	}

	return (
		<div className={props.className}>
			<div className="card justify-content-center">
				<div className="card-header header text-uppercase">Profile</div>
				<div className="card-body p-4">
					<div className="row mb-3 mb-lg-0 h-100 mb-lg-auto d-flex align-items-center">
						<div className="col-12 col-sm-3 col-md-2 col-lg-3 text-center text-sm-left mb-3 mb-sm-0">
							<img src={props.firebase.auth().currentUser.photoURL} className="rounded-circle w-100 img-thumbnail profile-photo" alt="" />
						</div>
						<div className="col-12 col-sm-9 col-md-10 col-lg-9 h-100 d-flex align-items-center p-0">
							<div className="text-center text-sm-left m-auto m-sm-0">
								<h3 className="mb-0 font-weight-bold text-uppercase d-block text-center text-sm-left">{profile.name}</h3>
								<span className="d-block">{profile.email}</span>
							</div>
						</div>
					</div>
					<hr />
					{!profile.tagged
						? <button className="btn btn-primary btn-lg btn-block" onClick={tagOut}>Tag out</button>
						: <div className="text-center text-sm-left">If you ain't first, you're last. You're out.</div>
					}
					<hr />
					<div className="row mb-3">
						<div className="col">
							<div className="card">
								<ul className="list-group list-group-flush">
									<li className="list-group-item"><strong>Target:</strong> {!profile.tagged ? target : 'N/A'}</li>
									<li className="list-group-item"><strong>Tags:</strong> {numTags}</li>
									<li className="list-group-item"><strong>Rank:</strong> {!profile.tagged ? rank : 'N/A'}</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<div className="card">
								<div className="card-header header text-uppercase">Badges</div>
								{badges.length > 0 ? (
									<div className="card-body p-2">
										{badges.map((badge, index) => {
											let title, img;

											switch (badge) {
												case 'firstOut':
													title = 'First Out';
													img = '/img/ghost.svg';
													break;

												case 'firstTag':
													title = 'First Tag';
													img = '/img/hermes.svg';
													break;

												case '5':
													title = 'Bloodthirsty';
													img = '/img/helmet.svg';
													break;

												case '10':
													title = 'Merciless';
													img = '/img/axe.svg';
													break;

												case '20':
													title = 'Absolute Unit';
													img = '/img/sword.svg';
													break;

												case 'kingslayer':
													title = 'Kingslayer';
													img = '/img/crown.svg';
													break;
											}

											return <img src={img} alt="" className="mr-2 d-inline-block rounded-circle img-thumbnail mb-2 mb-sm-0" data-toggle="tooltip"
													 data-placement="top" title={title} width={50} height={50} key={index} />
										})}
									</div>
								) : (
									<div className="card-body">You don't have any badges.</div>
								)}
							</div>
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
