import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';

const Layout = props => {
	return (
		<React.Fragment>
			<nav className="navbar navbar-light bg-light fixed-top shadow">
				<Link to="/" className="navbar-brand py-0"><h3 className="header my-0 text-uppercase">Gotcha 2019</h3></Link>
			</nav>
			{props.children}
		</React.Fragment>
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
)(Layout);