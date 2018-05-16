import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {logoutUser, setCurrentUser} from './actions/authAction';

import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from "./components/edit-profile/EditProfile";
import store from './store';

import {clearCurrentProfile} from "./actions/profileAction";
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import './App.css';

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));
	//time jwtToken
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		store.dispatch(clearCurrentProfile());
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<NavBar/>
						<Route exact path='/' component={Landing}/>
						<div className="container">
							<Route path='/login' component={Login}/>
							<Route path='/register' component={Register}/>
							<Route path='/profiles' component={Profiles}/>
							<Route path='/profile/:handle' component={Profile}/>
							<Switch>
								<PrivateRoute path='/dashboard' component={Dashboard}/>
								<PrivateRoute path='/create-profile' component={CreateProfile}/>
								<PrivateRoute path='/edit-profile' component={EditProfile}/>
								<PrivateRoute path='/add-experience' component={AddExperience}/>
								<PrivateRoute path='/add-education' component={AddEducation}/>
							</Switch>
						</div>
						<Footer/>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
