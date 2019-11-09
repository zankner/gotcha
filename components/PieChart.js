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
		this.state = {
			'class1': null,
			'class2': null,
			'class3': null,
			'class4': null
		}
		this.getData();
	}

	componentDidMount() {
		this.componentDidUpdate();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.getData();
		this.genGraph();
	}

	getData() {
		const userRef = this.props.firebase.firestore().collection('users');
		for (const grade of Object.keys(this.state)) {
		  userRef.where("tagged", "==", false).where("class", "==", grade).get().then(querySnapshot => {
				this.setState({[grade]: querySnapshot.size});
				if (querySnapshot.size > 0) this.show = true;
		  });
		}
		this.pie = this.genGraph();
	}

	genGraph() {
		const graphData = [];
		for (const grade of Object.keys(this.state)){
			graphData.push(this.state[grade]);
		}
		const allAlive = graphData.reduce((a, b) => a + b, 0);
		for (const x in graphData) {
			graphData[x] = 100*(graphData[x] / allAlive);
		}
		const pie = {
			labels: [
				`Freshman (${this.state.class4}%)`,
				`Sophomores (${this.state.class3}%)`,
				`Juniors (${this.state.class2}%)`,
				`Seniors (${this.state.class1}%)`
			],
			datasets: [{
				data: graphData,
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
		this.pie = pie;
	}

	render() {
		return (
			<div>
				{this.show &&
					<Pie data={this.pie} options={options} />
				}
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
