import React from 'react';
import Layout from './Layout';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ProfileCard from '../components/ProfileCard';
import LeaderboardCard from '../components/LeaderboardCard';

const Home = props => (
	<Layout>
		<div className="container min-vh-100">
			<div className="row vh-100 pt-nav">
				<div className="col-12 col-lg-6 py-3 py-sm-5">
					<ProfileCard />
				</div>
				<div className="col-12 col-lg-6 pb-3 pb-sm-5 pt-lg-5">
					<LeaderboardCard />
				</div>
			</div>
		</div>
	</Layout>
);

const mapStateToProps = state => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile
});

export default compose(
	connect(mapStateToProps),
	withFirebase,
	withRouter
)(Home);
