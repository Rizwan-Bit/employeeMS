import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { getDepartment, updateDepartment} from '../api';

const Update = ({ match }) => {
	const [ values, setValues ] = useState({
		name: '',
		error: false,
		success: false
	});


	const { name, error, success } = values;

	const init = (departmentId) => {
		getDepartment(departmentId).then((data) => {
			if (data.error) {
				setValues({ ...values, error: true });
			} else {
				setValues({ ...values, name: data.name });
			}
		});
  };
  

	useEffect(() => {
		init(match.params.departmentId);
	}, []);

	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		updateDepartment(match.params.departmentId, { name }).then((data) => {
			if (data.error) {
				console.log(data.error);
				alert(data.error);
			} else {
				updateDepartment(data, () => {
					setValues({
						...values,
						name: data.name,
						success: true
					});
				});
			}
		});
	};

	const redirectUser = (success) => {
		if (success) {
			return <Redirect to="/department" />;
		}
	};

	const departmentUpdate = (name) => (
		<form>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input type="text" onChange={handleChange('name')} className="form-control" value={name} />
			</div>

			<button onClick={clickSubmit} className="btn btn-primary">
				Submit
			</button>
		</form>
	);

	return (
		<div className="container">
			<h2 className="mb-4">Department Update</h2>
			 {departmentUpdate(name)}
			{redirectUser(success)}
		</div>
	);
};

export default Update;
