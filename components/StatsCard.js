import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import * as _ from 'lodash';

const StatsCard = props => {
	const [sumTags, setSumTags] = useState(null);

	useEffect(() => {
		const sumTagsRef = props.firebase.firestore().collection('stats').doc('sumTags');
		sumTagsRef.get().then(sumTagsDoc => {
			setSumTags(sumTagsDoc.data());
		});
	}, []);

	if (!sumTags) {
		return '';
	}

	return (
		<div className={props.className}>
			<div className="card">
				<div className="card-header header text-uppercase">Statistics</div>
				<div className="card-body p-4">
					<div className="card mb-3">
						<div className="card-header header text-uppercase">Totals</div>
						<ul className="list-group list-group-flush">
							<li className="list-group-item"><strong>Tagged:</strong> {_.sum(_.values(sumTags))}</li>
							<li className="list-group-item"><strong>Remaining:</strong> {707 - _.sum(_.values(sumTags))}</li>
						</ul>
					</div>
					<div className="card">
						<div className="card-header header text-uppercase">Tags by class</div>
						<div className="p-3 card-body">
							<Bar data={{
								labels: [
									'Freshman',
									'Sophomores',
									'Juniors',
									'Seniors'
								],
								datasets: [{
									label: 'Tags',
									data: [sumTags['2023'], sumTags['2022'], sumTags['2021'], sumTags['2020']],
									backgroundColor: [
										'#ad4c43',
										'#d1a49d',
										'#bad2e3',
										'#628bb9'
									],
									hoverBackgroundColor: [
										'#ad4c43',
										'#d1a49d',
										'#bad2e3',
										'#628bb9'
									]
								}]
							}} options={{
								responsive: true,
								legend: {
									display: false
								},
								scales: {
									yAxes: [{
										ticks: {
											beginAtZero: true,
											stepSize: 1
										},
										scaleLabel: {
											display: true,
											labelString: 'Tags',
											fontSize: 17,
											padding: 10
										}
									}],
									xAxes: [{
										gridLines: {
											display: false
										}
									}]
								}
							}} />
						</div>
						<ul className="list-group list-group-flush">
							<li className="list-group-item"><strong>Freshmen:</strong> {sumTags['2023']}</li>
							<li className="list-group-item"><strong>Sophomores:</strong> {sumTags['2022']}</li>
							<li className="list-group-item"><strong>Juniors:</strong> {sumTags['2021']}</li>
							<li className="list-group-item"><strong>Seniors:</strong> {sumTags['2020']}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
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
)(StatsCard);
