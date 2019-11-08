import React from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';

class BarChart extends React.Component {
	constructor(props) {
		super(props);
		this.getData();
	}

	getData() {
		// api call
		const classData = [50, 40, 20, 20];
		this.bar = this.makeBar(classData);
	}

	makeBar (data) {
		const bar = {
			labels: [
				`Freshman`,
				`Sophomores`,
				`Juniors`,
				`Seniors`
			],
			datasets: [{
				data: data,
				backgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56'
				],
				hoverBackgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56'
				]
			}]
		};
		return bar;
	}

	render() {
		return (
			<div>
				<Bar data={this.bar} options={options} />
			</div>
		);
	}
}


const options = {
	responsive: true,
  legend: {
    display: false
  },
  title: {
  	display: true,
  	position: 'top',
  	text: 'Total Tags Per Class',
  	fontSize: 20
  },
  scales: {
  	yAxes: [{
  		ticks: {
  			min: 0
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
}

const mapStateToProps = state => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile
});

export default compose(
	connect(mapStateToProps),
	withFirebase,
	withRouter
)(BarChart);