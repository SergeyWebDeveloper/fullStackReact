import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {logoutUser, setCurrentUser} from './actions/authAction';

import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import store from './store';

import './App.css';

if(localStorage.jwtToken){
	setAuthToken(localStorage.jwtToken);
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));
	//time jwtToken
	const currentTime = Date.now()/1000;
	if(decoded.exp<currentTime){
		store.dispatch(logoutUser());
		window.location.href='/login';
	}
	console.log(currentTime,'---',decoded.exp);
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
						</div>
						<Footer/>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
