import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ProfileCard from '../components/ProfileCard';
import LeaderboardCard from '../components/LeaderboardCard';
import RecentTagsCard from '../components/RecentTagsCard';
import DevelopersCard from '../components/DevelopersCard';
import StatsCard from '../components/StatsCard';

const Home = props => {
	useEffect(() => {
		if (props.auth.isLoaded && props.auth.isEmpty) {
			props.history.replace('/login');
		}
	}, [props.auth]);

	if (props.auth.isEmpty) {
		return '';
	}

	return (
		<Layout>
			<div className="container min-vh-100">
				<div className="row vh-100 pt-nav">
					<div className="col-12 col-lg-6 pb-3 pb-sm-4 pb-lg-5 pt-3 pt-sm-5">
						<ProfileCard className="mb-3 mb-sm-4" />
						<RecentTagsCard />
					</div>
					<div className="col-12 col-lg-6 pb-3 pb-sm-5 pt-lg-5">
						<LeaderboardCard className="mb-3 mb-sm-4" />
						<StatsCard className="mb-3 mb-sm-4" />
						<DevelopersCard />
					</div>
				</div>
			</div>
		</Layout>
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
)(Home);
