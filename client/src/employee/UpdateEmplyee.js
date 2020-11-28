import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { readEmployee, updateEmployee} from '../api';

const Update = ({ match }) => {
	const [ values, setValues ] = useState({
		name: '',
		surname: '',
		address: '',
    	qualification: '',
    	contactNumber: '',
		error: false,
		success: false
	});


	const { name, surname, address, qualification, contactNumber, department, error, success } = values;

	const init = (employeeId) => {
		readEmployee(employeeId).then((data) => {
			if (data.error) {
				setValues({ ...values, error: true });
			} else {
				setValues({ ...values, name: data.name, surname: data.surname, address: data.address, qualification: data.qualification, contactNumber: data.contactNumber, department: data.department });
			}
		});
  };
  

	useEffect(() => {
		init(match.params.employeeId);
	}, []);

	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		updateEmployee(match.params.employeeId, { name, surname, address, qualification, contactNumber }).then((data) => {
			if (data.error) {
				console.log(data.error);
				alert(data.error);
			} else {
				updateEmployee(data, () => {
					setValues({
						...values,
						name: data.name,
						surname: data.surname,
            			address: data.addree,
            			qualification: data.qualification,
            			contactNumber: data.contactNumber,
						success: true
					});
				});
			}
		});
	};

	const redirectUser = (success) => {
		if (success) {
			return <Redirect to="/employee" />;
		}
	};

	const EmployeeUpdate = (name, surname, address, qualification, contactNumber, department) => (
		<form>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input type="text" onChange={handleChange('name')} className="form-control" value={name} />
			</div>
			<div className="form-group">
				<label className="text-muted">surname</label>
				<input type="text" onChange={handleChange('surname')} className="form-control" value={surname} />
			</div>
			<div className="form-group">
				<label className="text-muted">Address</label>
				<input type="text" onChange={handleChange('address')} className="form-control" value={address} />
			</div>
			<div className="form-group">
				<label className="text-muted">Qualification</label>
				<input type="text" onChange={handleChange('qualification')} className="form-control" value={qualification} />
			</div>
      		<div className="form-group">
				<label className="text-muted">Contact Number</label>
				<input type="number" onChange={handleChange('contactNumber')} className="form-control" value={contactNumber} />
			</div>


			<button onClick={clickSubmit} className="btn btn-primary">
				Submit
			</button>
		</form>
	);

	return (
		<div className="container">
			<h2 className="mb-4">Employee Update</h2>
			 {EmployeeUpdate(name, surname, address, qualification, contactNumber, department)}
			{redirectUser(success)}
		</div>
	);
};

export default Update;
