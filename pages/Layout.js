import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';

const Layout = props => {
	return (
		<React.Fragment>
			<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow">
				<Link to="/" className="navbar-brand py-0"><h3 className="header my-0 text-uppercase">Gotcha 2019</h3></Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar"
								aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbar">
					<ul className="navbar-nav ml-sm-auto">
						<li className="nav-item"><Link className="nav-link font-weight-bold" href="#" to="/stats">Stats</Link></li>
						<li className="nav-item"><Link className="nav-link font-weight-bold" href="#" to="/">Home</Link></li>
					</ul>
				</div>
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