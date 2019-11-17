import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from '@firebase/app';
import rootReducer from '../../modules/reducers';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../../pages';
import Login from '../../pages/login';

// Initialize Firebase
firebase.initializeApp({
	apiKey: 'AIzaSyBX-EwuQ3j5cubMXWlrMtkuaOpBToBuUR8',
	authDomain: 'gotcha-67060.firebaseapp.com',
	databaseURL: 'https://gotcha-67060.firebaseio.com',
	projectId: 'gotcha-67060',
	storageBucket: '',
	messagingSenderId: '36005693410',
	appId: '1:36005693410:web:8160a34a1e51cec0a05bbb',
	measurementId: 'G-980MR3KD3E'
});

// Initialize Firestore
firebase.firestore();

// Initialize Redux
const store = createStore(rootReducer);

const rrfProps = {
	firebase,
	config: {
		userProfile: 'users',
		useFirestoreForProfile: true
	},
	dispatch: store.dispatch,
	createFirestoreInstance
};

// Initialize Font Awesome
library.add(fas);

render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
				</Switch>
			</BrowserRouter>
		</ReactReduxFirebaseProvider>
	</Provider>, document.getElementById('root')
);
