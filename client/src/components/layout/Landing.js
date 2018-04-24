import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Landing extends Component {
	render() {
		return (
			<div className="landing">
				<div className="dark-overlay landing-inner text-light">
					<div className="container">
						<div className="row">
							<div className="col-md-12 text-center">
								<h1 className="display-3 mb-4">DeveloperConnector
								</h1>
								<p className="lead"> Создайте профиль разработчика/портфолио, поделитесь сообщениями и получите помощь от других разработчиков.</p>
								<hr />
								<Link to="/register" className="btn btn-lg btn-info mr-2">Регистрация</Link>
								<Link to="/login" className="btn btn-lg btn-light">Логин</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;
