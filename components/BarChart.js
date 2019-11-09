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
		this.state = {'tags':[]};
	}

	componentDidMount() {
		this.componentDidUpdate();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.getData();
		this.genGraph();
	}

	getData() {
		const statsRef = this.props.firebase.firestore().collection('stats').doc('sumTags');
		statsRef.get().then(doc => {
			const stats = doc.data();
			const tags = [];
			tags.push(stats.class1, stats.class2, stats.class3, stats.class4);
			this.setState({tags: tags});
		})
	}

	genGraph() {
		const bar = {
			labels: [
				'Freshman',
				'Sophomores',
				'Juniors',
				'Seniors'
			],
			datasets: [{
				data: this.state.tags,
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
		this.bar = bar;
	}

	render() {
		return (
			<div>
			{this.state.tags.length != 0 &&
				<Bar data={this.bar} options={options} />
			}
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
