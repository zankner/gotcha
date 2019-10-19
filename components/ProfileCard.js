import React from 'react';
import { withRouter } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ErrorMessage, Field, Form, Formik, getIn } from 'formik';
import ProfileAchievement from './ProfileAchievement';
import { Line } from 'react-chartjs-2';

class ProfileCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
      <div className="container-fluid">
        <div className="row profile-header-row">
          <div className="col-12">
            <h1 className="text-center profile-name">{user.name}</h1>
            <div className="text-center profile-info">
              <span className="tags">TAGS: {user.tags.total}</span>
              <span>PLACE: {user.place}</span>
            </div>
          </div>
          <div className="col-10 offset-1">
            <hr/>
          </div>
        </div>
        <div className="row justify-content-center profile-row-margin">
          <div className="col-md-8 col-12">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                {indeces}
              </ol>
              <div className="carousel-inner">
                {achievementsHTML}
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
        <div className="container stats profile-row-margin">
          <div className="row profile-row-margin">
            <div className="col-12 col-md-8 offset-md-2">
               <Line data={data} options={options}/>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-9 col-md-5">
              <h4 className="text-center profile-tag-history">Tag History</h4>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Day</th>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {tagTableHTML}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
		);
	}
}

// this is data that would come from database
const user = {
  name: 'Max Litvak',
  tags: {
    total: 4,
    days: [{
      total: 1,
      people: ['Ben'],
      day: 'Monday'
    },
    {
      total: 1,
      people: [],
      day: 'Tuesday'
    },
    {
      total: 4,
      people: ['Zack', 'Brendan', 'DJ'],
      day: 'Wednesday'
    }]
  },
  place: 17,
  achievements: ['speed', 'alive1', '3tags'],
};

const achievementsHTML = [];
const indeces = [];
for (const i in user.achievements) {
  if (i == 0) {
    achievementsHTML.push(<div className="carousel-item active" key={i}>
      <ProfileAchievement achievement={user.achievements[i]}/>
    </div>);
  } else {
    achievementsHTML.push(<div className="carousel-item" key={i}>
      <ProfileAchievement achievement={user.achievements[i]}/>
    </div>);
  }
  indeces.push(<li data-target="#carouselExampleIndicators" data-slide-to="{i}" className="active" key={i}></li>);
}

const tagTableHTML = [];
const graphData = [];
const graphTooltips = {}
let index = 0;
for (const i in user.tags.days) {
  for (const person in user.tags.days[i].people) {
    index += 1;
    tagTableHTML.push(<tr key={index}>
                        <th scope="col" key={0}>{index}</th>
                        <th scope="col" key={1}>{user.tags.days[i].day}</th>
                        <th scope="col" key={2}>{user.tags.days[i].people[person]}</th>
                      </tr>);
  }
  graphData.push(user.tags.days[i].total);
  graphTooltips[user.tags.days[i].day] = user.tags.days[i].people;
}

const data = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  datasets: [
    {
      label: "Max's tags",
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      data: graphData
    }
  ]
};

const options = {
  responsive: true,
   scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        stepSize: 1
      }
    }]
  },
  tooltips: {
    callbacks: {
      afterTitle: function(tooltipItem, data) {
        if (tooltipItem[0].value == 1) return tooltipItem[0].value + ' tag';
        return tooltipItem[0].value + ' tags';
      },
      label: function(tooltipItem, data) {
        let tooltip = '';
        for (const i in graphTooltips[tooltipItem.label]) {
          let seperator = '';
          if (i != graphTooltips[tooltipItem.label].length - 1) seperator = ', ';
          tooltip += ' ' + graphTooltips[tooltipItem.label][i] + seperator
        }
        return tooltip
      }
    }
  }
};

const mapStateToProps = state => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile
});

export default compose(
	connect(mapStateToProps),
	withFirebase,
	withRouter
)(ProfileCard);