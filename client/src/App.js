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
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
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
							<Route path='/not-found' component={NotFound}/>
							<Switch>
								<PrivateRoute exact path='/dashboard' component={Dashboard}/>
								<PrivateRoute exact path='/create-profile' component={CreateProfile}/>
								<PrivateRoute exact path='/edit-profile' component={EditProfile}/>
								<PrivateRoute exact path='/add-experience' component={AddExperience}/>
								<PrivateRoute exact path='/add-education' component={AddEducation}/>
								<PrivateRoute exact path='/feed' component={Posts}/>
								<PrivateRoute exact path='/post/:id' component={Post}/>
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
