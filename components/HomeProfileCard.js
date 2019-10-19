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
	}

	render() {
		return (
			<div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
				<div className="col-md-5 p-lg-5 mx-auto my-5">
					<div className="card mb-3 rounded-lg shadow-lg" style={{'max-width': 540}}>
						<div className="row no-gutters">
							<div className="col-md-4">
								<img src="..." className="card-img" alt="..." />
							</div>
							<div className="col-md-8">
								<div className="card-body">
									<h5 className="card-title">Card title</h5>
									<p className="card-text">This is a wider card with supporting text below as a natural lead-in to
										additional content. This content is a little bit longer.</p>
									<p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
								</div>
							</div>
						</div>
					</div>
					<button type="button" className="btn btn-primary btn-lg">Tag out</button>
				</div>
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
