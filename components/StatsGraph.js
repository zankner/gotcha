import React from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

class StatsGraph extends React.Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	render() {
		return (
			<div
				className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
				<h1 className="h2">Dashboard</h1>
				<div className="btn-toolbar mb-2 mb-md-0">
					<div className="btn-group mr-2">
						<button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
						<button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
					</div>
					<button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
						<span data-feather="calendar" />
						This week
					</button>
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
)(StatsGraph);
