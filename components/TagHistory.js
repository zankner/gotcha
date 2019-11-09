import React from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

class TagHistory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			'tagHistory': null
		};
	}

	componentDidMount() {
		this.getData();
		this.componentDidUpdate();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.genTableBody();
	}

	getData() {
		// api call
		this.setState({tagHistory: [
			{
				name: 'Ben',
				class: 'II',
				time: 'Monday'
			},
			{
				name: 'Zack',
				class: 'I',
				time: 'Tuesday'
			},
			{
				name: 'Slim',
				class: 'I',
				time: 'Thursday'
			}
		]});
	}

	genTableBody() {
		this.tableBody = [];
		for (const x in this.state.tagHistory) {
			this.tableBody.push(
				<tr key={x}>
					<th key={`${x} index`}>{this.state.tagHistory.indexOf(this.state.tagHistory[x])}</th>
					<th key={`${x} name`}>{this.state.tagHistory[x].name}</th>
					<th key={`${x} class`}>{`Class ${this.state.tagHistory[x].class}`}</th>
					<th key={`${x} time`}>{this.state.tagHistory[x].time}</th>
				</tr>
			);
		}
	}

	render() {
		return (
			<div>
				<table className="table">
					<thead className="thead-dark">
					 <tr>
				      <th>#</th>
				      <th>Name</th>
				      <th>Class</th>
				      <th>Time</th>
				    </tr>
			  	</thead>
			  	<tbody>
			  		{this.tableBody}
			  	</tbody>
			  </table>
	  	</div>
		);
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
)(TagHistory);