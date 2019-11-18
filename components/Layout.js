import React, { useEffect, useMemo } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import LastWordsModal from './LastWordsModal';
import { parse } from 'query-string';

const Layout = props => {
	const audio = useMemo(() => new Audio('/audio/hype.mp3'), []);

	useEffect(() => {
		const query = parse(props.location.search);
		if (query.modal) {
			$(`#${query.modal}`).modal('show');
		}
	});

	return (
		<React.Fragment>
			<nav className="navbar navbar-light bg-light fixed-top shadow">
				<Link to="#" className="navbar-brand py-0" onClick={() => {
					if (audio.paused) {
						audio.play();
					} else {
						audio.pause();
					}
				}}><h3 className="header my-0 text-uppercase">Gotcha 2019</h3></Link>
			</nav>
			{props.children}

			<LastWordsModal />
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