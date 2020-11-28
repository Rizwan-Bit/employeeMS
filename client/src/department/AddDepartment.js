import React, { useState } from 'react';
import {createDepartment} from '../api'

const AddDepartment = () => {
	const [ values, setValues ] = useState({
		name: '',
		error: '',
		success: false
	});

	const { name, success, error } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		createDepartment({ name }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, success: false });
			} else {
				setValues({
					...values,
					name: '',
					error: '',
					success: true
				});
			}
		});
	};

	const addDepForm = () => (
    <div className="container">
		<form className="col col-xl-8 col-lg-8 mr-auto ml-auto mt-5">
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input onChange={handleChange('name')} type="text" className="form-control" value={name} />
			</div>

			<button onClick={clickSubmit} className="btn btn-primary mb-5">
				Submit
			</button>
		</form>
    </div>
	);

	const showError = () => (
		<div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
			{error}
		</div>
	);

	const showSuccess = () => (
		<div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
			New Department is created.
		</div>
	);

	return (
		<div>
			{showSuccess()}
			{showError()}
			{addDepForm()}
		</div>
	);
};

export default AddDepartment;


