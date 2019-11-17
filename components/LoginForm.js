import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { parse } from 'query-string';

const LoginForm = props => {
	const [alert, setAlert] = useState(null);

	useEffect(() => {
		props.firebase.auth().onAuthStateChanged(user => {
			if (user) {
				if (user.email.split('@')[1] !== 'milton.edu') {
					return props.firebase.auth().currentUser.delete().then(() => {
						setAlert('Please sign in with your Milton email address');
					});
				}

				const query = parse(props.location.search);
				if (query.redirect) {
					return props.history.push(query.redirect);
				}

				props.history.push('/');
			}
		});
	}, []);

	return (
		<React.Fragment>
			<button className="btn btn-lg btn-block btn-primary" onClick={() => {
				const provider = new props.firebase.auth.GoogleAuthProvider();
				provider.setCustomParameters({
					'hd': 'milton.edu'
				});

				props.firebase.auth().signInWithPopup(provider).catch(err => {
					switch (err.code) {
						case 'auth/auth/cancelled-popup-request':
						case 'auth/popup-closed-by-user':
							break;

						case 'auth/user-not-found':
							setAlert('Couldn\'t find a user with that email.');
							break;

						default:
							setAlert('Something went wrong. Please try again.');
					}
				});
			}}>Get started</button>
			<div role="alert" className="alert alert-danger mt-3 mb-0 animate bounceIn" hidden={!alert}>{alert}</div>
		</React.Fragment>
	);
};

const mapStateToProps = state => ({
	auth: state.firebase.auth
});

export default compose(
	connect(mapStateToProps),
	withFirebase,
	withRouter
)(LoginForm);
