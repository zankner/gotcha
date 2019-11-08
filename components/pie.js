import React from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';

class PieChart extends React.Component {
	constructor(props) {
		super(props);
		this.getData();
	}

	getData() {
		// api call
		const classData = [50, 10, 20, 20];
		this.pie = this.makePie(classData);
	}

	makePie (data) {
		const pie = {
			labels: [
				`Freshman (${data[0]}%)`,
				`Sophomores (${data[1]}%)`,
				`Juniors (${data[2]}%)`,
				`Seniors (${data[3]}%)`
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
		return pie;
	}

	render() {
		return (
			<div>
				<Pie data={this.pie} options={options} />
			</div>
		);
	}
}


const options = {
	responsive: true,
	width: '600px',
  legend: {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#333",
      fontSize: 12,
      padding: 15
    }
  },
  animation: {
  	animateScale: true
  },
  title: {
  	display: true,
  	position: 'top',
  	text: ['Class Distrubition', '(Still alive)'],
  	fontSize: 20
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
)(PieChart);