import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profileAction';

class Education extends Component {
	onDeleteClick = (id) => {
		this.props.deleteEducation(id);
	};
	render() {
		const education = this.props.education.map(edu => (
			<tr key={edu._id}>
				<td>{edu.school}</td>
				<td>{edu.degree}</td>
				<td>
					<Moment format='YYYY/MM/DD'>{edu.from}</Moment> -
					{edu.to === null ? ('по НВ') : (<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)}
				</td>
				<td>
					<button
						className="btn btn-danger"
						onClick={this.onDeleteClick.bind(null,edu._id)}
					>Удалить</button>
				</td>
			</tr>
		));
		return (
			<div>
				<h4 className='mb-4'>Образование</h4>
				<table className='table'>
					<thead>
					<tr>
						<th>Школа</th>
						<th>Степень</th>
						<th>Год</th>
						<th/>
					</tr>
					</thead>
					<tbody>{education}</tbody>
				</table>
			</div>
		);
	}
};

Education.propTypes = {
	deleteEducation: PropTypes.func.isRequired
};

export default connect(null,{deleteEducation})(Education);