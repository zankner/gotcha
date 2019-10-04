import React from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ErrorMessage, Field, Form, Formik, getIn } from 'formik';

class HomeProfileCard extends React.Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	render() {
		return (
			<div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
				<div class="col-md-5 p-lg-5 mx-auto my-5">
					<h1 class="display-4 font-weight-normal">Punny headline</h1>
					<p class="lead font-weight-normal">And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple’s marketing pages.</p>
				</div>
			<div class="product-device shadow-sm d-none d-md-block"/>
			<div class="product-device product-device-2 shadow-sm d-none d-md-block"/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile
});

export default compose(
	connect(mapStateToProps),
	withFirebase,
	withRouter
)(HomeProfileCard);
