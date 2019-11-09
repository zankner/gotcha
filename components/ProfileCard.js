import React from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

const ProfileCard = () => {
	return (
		<div className="card justify-content-center">
			<div className="card-header header text-uppercase">Profile</div>
			<div className="card-body p-4">
				<h1 className="header text-uppercase text-center">Ben Botvinick</h1>
				<hr />
				<button className="btn btn-primary btn-lg btn-block">Tag out</button>
				<hr />
				<div className="row">
					<div className="col">
						<div className="card">
							<ul className="list-group list-group-flush">
								<li className="list-group-item"><strong>Target:</strong> Zack Ankner</li>
								<li className="list-group-item"><strong>Tags:</strong> 4</li>
								<li className="list-group-item"><strong>Rank:</strong> 76</li>
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
