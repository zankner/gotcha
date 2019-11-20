import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { Field, Form, Formik, getIn } from 'formik';
import LastWordsSchema from '../modules/schemas/LastWordsSchema';
import { connect } from 'react-redux';

const LastWordsForm = props => {
	const [alert, setAlert] = useState(null);

	const onSubmit = (values, actions) => {
		const { lastWords } = values;
		if (!props.auth.isEmpty) {
			props.firebase.auth().currentUser.getIdToken().then(token => {
				$.ajax({
					method: 'POST',
					url: '/tag',
					contentType: 'application/json',
					data: JSON.stringify({ token, lastWords: lastWords.trim() })
				}).done(data => {
					const interval = setInterval(() => {
						$.ajax({
							method: 'GET',
							url: `/job/${data.id}`,
							contentType: 'application/json'
						}).done(data => {
							if (data.state === 'completed') {
								clearInterval(interval);
								actions.setSubmitting(false);
								props.history.replace('/');
								window.location.reload();
							}
						}).fail(() => {
							clearInterval(interval);
							actions.setSubmitting(false);
							setAlert('Whoops! Something went wrong.');
						});
					}, 200);
				}).fail(() => {
					actions.setSubmitting(false);
					setAlert('Whoops! Something went wrong.');
				});
			});
		}
	};

	return (
		<Formik
			initialValues={{ lastWords: '' }}
			validationSchema={LastWordsSchema}
			onSubmit={onSubmit}
			render={({ errors, isSubmitting, submitCount }) => (
				<Form className="form-validate" autoComplete="off">
					<div className="form-group mb-3">
						<label className="form-label">Last words</label>
						<Field
							name="lastWords" placeholder="Enter your last words"
							className={getIn(errors, 'email') && submitCount > 0
								? 'form-control is-invalid'
								: 'form-control'
							}
						/>
					</div>
					<button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>Tag out</button>
					<div role="alert" className="alert alert-danger mt-3 mb-0 animate bounceIn" hidden={!alert}>{alert}</div>
				</Form>
			)}
		/>
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
)(LastWordsForm);