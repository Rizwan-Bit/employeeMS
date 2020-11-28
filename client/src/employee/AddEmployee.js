import React, { useState, useEffect } from 'react';
import { createEmployee, getDepartments } from '../api';

const AddEmployee = () => {
	const [ values, setValues ] = useState({
		name: '',
		surname: '',
    	address: '',
    	qualification: '',
    	contactNumber: '',
		departments: [],
		department: '',
		loading: false,
		error: '',
		success: false,
		createdEmployee: '',
		redirectToProfile: false,
		formData: ''
	});

	const { name, surname, address, qualification, contactNumber, departments, department, loading, error, success, createdEmployee, formData } = values;

	// load categories and set form data
	const init = () => {
		getDepartments().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					departments: data,
					formData: new FormData()
				});
			}
		});
	};

	useEffect(() => {
		init();
	}, []);

	const handleChange = (name) => (event) => {
		const value = event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		createEmployee({name, surname, address, qualification, contactNumber, departments}).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, success: false });
			} else {
				setValues({
					...values,
					name: '',
					surname: '',
					address: '',
					qualification: '',
					contactNumber: '',
					loading: false,
					error: '',
					success: true,
					createdEmployee: data.name
				});
			}
		});
	};

	const newPostForm = () => (
		<form className="mb-4" onSubmit={clickSubmit}>

			<div className="form-group">
				<label className="text-muted">Name</label>
				<input onChange={handleChange('name')} type="text" className="form-control" value={name} />
			</div>

			<div className="form-group">
				<label className="text-muted">Surname</label>
				<input onChange={handleChange('surname')} type="text" className="form-control" value={surname} />
			</div>

      <div className="form-group">
				<label className="text-muted">Address</label>
				<textarea onChange={handleChange('address')} className="form-control" value={address} />
			</div>

      			<div className="form-group">
				<label className="text-muted">Qualification</label>
				<input onChange={handleChange('qualification')} type="text" className="form-control" value={qualification} />
			</div>

			<div className="form-group">
				<label className="text-muted">Contact Number</label>
				<input onChange={handleChange('contactNumber')} type="number" className="form-control" value={contactNumber} />
			</div>

			<div className="form-group">
				<label className="text-muted">Department</label>
				<select onChange={handleChange('department')} className="form-control">
					<option>Please select</option>
					{departments &&
						departments.map((d, i) => (
							<option key={i} value={d._id}>
								{d.name}
							</option>
						))}
				</select>
			</div>

			<div className="resbtn">
				<button className="btn btn-outline-primary">Add Employee</button>
			</div>
		</form>
	);

	const showError = () => (
		<div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
			{error}
		</div>
	);

	const showSuccess = () => (
		<div className="alert alert-info" style={{ display: createdEmployee ? '' : 'none' }}>
			<h3>Employee {`${createdEmployee}`} is Added!</h3>
		</div>
	);

	const showLoading = () =>
		loading && (
			<div className="alert alert-success">
				<h3>Loading...</h3>
			</div>
		);

	return (
			<div className="Container col-md-8 offset-md-2">
				<div className="row">
					<div className="col-md-8 offset-md-2">
						{showLoading()}
						{showSuccess()}
						{showError()}
						{newPostForm()}
					</div>
				</div>
			</div>
	);
};

export default AddEmployee;
