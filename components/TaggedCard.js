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
		this.state = {
			name: '',
			lastWords: ''
		};
	}

	componentDidMount() {
		this.componentDidUpdate();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.getUser();
	}

	getUser(){
		this.props.firebase.firestore().collection('users').doc('zack').get().then(doc => {
			const user = doc.data();
			this.setState({name: user.name, lastWords: user.lastWords});
		})
	}

	render() {
		return (
			<div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
				<div className="my-3 py-3">
					<h2 className="display-5"> {this.state.name}</h2>
					<p className="lead">{this.state.lastWords}</p>
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
