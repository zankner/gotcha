import React from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ErrorMessage, Field, Form, Formik, getIn } from 'formik';
import ProfileAchievement from './ProfileAchievement';

class AchievementsCarousel extends React.Component {
	constructor(props) {
		super(props);
		this.achievements = this.getAchievements();
		this.defineAchievements();
	}

	getAchievements() {
		// api call
		return ['speed', 'alive1', '3tags'];
	}

	defineAchievements() {
		this.achievementsHTML = [];
		this.indeces = [];
		for (const i in this.achievements) {
		  if (i == 0) {
		    this.achievementsHTML.push(<div className="carousel-item active" key={i}>
		      <ProfileAchievement achievement={this.achievements[i]}/>
		    </div>);
		  } else {
		    this.achievementsHTML.push(<div className="carousel-item" key={i}>
		      <ProfileAchievement achievement={this.achievements[i]}/>
		    </div>);
		  }
		  this.indeces.push(<li data-target="#carouselExampleIndicators" data-slide-to="{i}" className="active" key={i}></li>);
		}
	}

	render() {
		return (
			<div className="row justify-content-center profile-row-margin">
        <div className="col-md-8 col-12">
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              {this.indeces}
            </ol>
            <div className="carousel-inner">
              {this.achievementsHTML}
            </div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
             </a>
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
)(AchievementsCarousel);