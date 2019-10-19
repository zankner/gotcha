import React from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ErrorMessage, Field, Form, Formik, getIn } from 'formik';

class TaggedCard extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.componentDidUpdate();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (!this.props.profile.isLoaded || !this.props.auth.isLoaded || this.state.error) {
			return;
		}

		if (!this.state.profile.isLoaded) {
			const uid = this.props.match.params.uid;

			// If the logged in user is viewing their own profile
			if (this.props.auth.uid === uid) {
				this.setState({ profile: { ...this.props.profile, isSelf: true, isLoaded: true } });
			} else {
				this.props.firebase.firestore().collection('users').doc(uid).get().then(doc => {
					const profile = doc.data();

					if (!profile) {
						this.setState({ error: true });
					}

					this.setState({ profile: { ...profile, isSelf: false, isLoaded: true } });
				}).catch(() => this.setState({ error: true }));
			}
		}
	}

	getUser(){
		this.props.userRef.get().then(doc => {
			const profile = doc.date;

		})
	}

	render() {
		return (
			<div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
				<div className="my-3 py-3">
					<h2 className="display-5"> Another headline </h2>
					<p className="lead">And an even wittier subheading.</p>
				</div>
				<div className="bg-light shadow-sm mx-auto"
						 style= {{width: '80%', height: 300, 'border-radius': '21px 21px 0 0'}}/>
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
)(TaggedCard);
