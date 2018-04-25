import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authAction';

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
