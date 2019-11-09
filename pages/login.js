import React from 'react';
import { parse } from 'query-string';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

const Login = props => {
	return (
		<button type="button" onClick={() => {
			const provider = new props.firebase.auth.GoogleAuthProvider();
			props.firebase.auth().signInWithPopup(provider).then(() => {
				const query = parse(props.location.search);
				if (query.redirect) {
					return props.history.push(query.redirect);
				}

				props.history.push('/');
			}).catch(err => {
				console.log(err);
			});
		}} className="btn btn btn-outline-muted btn-block btn-social mb-3">
			<i className="fa-2x fa-google fab btn-social-icon" />Sign in <span className="d-none d-sm-inline">with Google</span>
		</button>
	);
};

const mapStateToProps = state => ({
	auth: state.firebase.auth
});

export default compose(
	connect(mapStateToProps),
	withFirebase,
	withRouter
)(Login);