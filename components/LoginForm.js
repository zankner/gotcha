import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import LoginSchema from '../modules/schemas/LoginSchema';
import { ErrorMessage, Field, Form, Formik, getIn } from 'formik';
import { parse } from 'query-string';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = { alert: null };
		this.onSubmit = this.onSubmit.bind(this);
		this.loginWithProvider = this.loginWithProvider.bind(this);
	}

	loginWithProvider(provider) {
		this.setState({ alert: null });
		this.props.firebase.login({ provider: provider, type: 'popup' }).then(() => {
			const query = parse(this.props.location.search);
			if (query.redirect) {
				return this.props.history.push(query.redirect);
			}

			this.props.history.push('/');
		}).catch(err => {
			switch (err.code) {
				case 'auth/auth/cancelled-popup-request':
				case 'auth/popup-closed-by-user':
					break;

				case 'auth/user-not-found':
					this.setState({ alert: 'Couldn\'t find a user with that email.' });
					break;

				default:
					this.setState({ alert: 'Something went wrong. Please try again.' });
			}
		});
	}

	onSubmit(values, actions) {
		this.setState({ alert: null });
		this.props.firebase.login(values).then(() => {
			const query = parse(this.props.location.search);
			if (query.redirect) {
				return this.props.history.push(query.redirect);
			}

			this.props.history.push('/');
		}).catch(err => {
			switch (err.code) {
				case 'auth/wrong-password':
					this.setState({ alert: 'Whoops! That\'s not your password.' });
					break;

				case 'auth/user-not-found':
					this.setState({ alert: 'Couldn\'t find a user with that email.' });
					break;

				default:
					this.setState({ alert: 'Something went wrong. Please try again.' });
			}

			return actions.setSubmitting(false);
		});
	}

	render() {
		return (
			<Formik
				initialValues={{
					email: '',
					password: ''
				}}
				validationSchema={LoginSchema}
				onSubmit={this.onSubmit}
				render={({ errors, isSubmitting, touched }) => (
					<Form className="form-validate" autoComplete="off">
						<div className="form-group">
							<label className="form-label">Email address</label>
							<Field name="email" placeholder="name@address.com"
										 className={getIn(errors, 'email') && getIn(touched, 'email')
											 ? 'form-control is-invalid'
											 : 'form-control'
										 }
							/>
							<ErrorMessage name="email" component="span" className="mt-1 text-danger small" />
						</div>

						<div className="form-group mb-4">
							<div className="row">
								<div className="col"><label className="form-label">Password</label></div>
								<div className="col-auto">
									<a href="#" data-toggle="modal" data-target="#forgotPasswordModal" className="form-text small">Forgot password?</a>
								</div>
							</div>
							<Field name="password" placeholder="Password" type="password" component="input"
										 className={getIn(errors, 'password') && getIn(touched, 'password')
											 ? 'form-control is-invalid'
											 : 'form-control'
										 }
							/>
							<ErrorMessage name="password" component="span" className="mt-1 text-danger small" />
						</div>

						<div className="form-group mb-4">
							<div className="custom-control custom-checkbox">
								<Field name="remember" id="rememberMeCheckbox" component="input" type="checkbox" className="custom-control-input" />
								<label htmlFor="rememberMeCheckbox" className="custom-control-label text-muted">
									<span className="text-sm">Remember me for 30 days</span>
								</label>
							</div>
						</div>
						<button className="btn btn-lg btn-block btn-primary" type="submit" disabled={isSubmitting}>Sign in</button>
						<hr data-content="OR" className="my-3 hr-text letter-spacing-2" />
						<button type="button" onClick={() => {
							this.loginWithProvider('google');
						}} className="btn btn btn-outline-muted btn-block btn-social mb-3">
							<i className="fa-2x fa-google fab btn-social-icon" />Sign in <span className="d-none d-sm-inline">with Google</span>
						</button>
						<button type="button" onClick={() => {
							this.loginWithProvider('facebook');
						}} className="btn btn btn-outline-primary btn-block btn-social mb-3">
							<i className="fa-2x fa-facebook-f fab btn-social-icon" />Sign in <span className="d-none d-sm-inline">with Facebook</span>
						</button>
						<hr className="my-3" />
						<div role="alert" className="alert alert-danger mt-3 animate bounceIn" hidden={!this.state.alert}>{this.state.alert}</div>
						<p className="text-sm text-muted">Don't have an account yet? <Link to={`/signup${this.props.location.search}`}>Sign up</Link></p>
					</Form>
				)}
			/>
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
)(LoginForm);
