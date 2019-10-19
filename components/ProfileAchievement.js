import React from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ErrorMessage, Field, Form, Formik, getIn } from 'formik';

class ProfileAchievement extends React.Component {
	constructor(props) {
		super(props);
		switch(props.achievement) {
			case 'speed' :
				this.achievementTitle = 'Speed';
				this.achievementText = 'Reached 10mph';
				this.img = "/img/speed-achievement.png";
				break;
			case 'alive1' :
				this.achievementTitle = 'Staying Alive';
				this.achievementText = 'Survived the first day';
				this.img = "/img/heart.jpg";
				break;
			case '3tags' :
				this.achievementTitle = 'Hunter';
				this.achievementText = 'Tagged 3 people';
				this.img = "/img/hunter.jpg";
				break;
		}
	}

	// if we want image instead of svg <img className="d-block w-100 carousel-img" src="path to image"/>
	render() {
		return (
			<div>
       <svg className="bd-placeholder-img carousel-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect width="100%" height="100%" fill="#777"/></svg>
        <div className="container">
          <div className="carousel-caption">
            <img className="achievement-img" src={this.img}/>
            <h2>{this.achievementTitle}</h2>
            <p>{this.achievementText}</p>
          </div>
        </div>
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
)(ProfileAchievement);
