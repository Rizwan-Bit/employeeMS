import { API } from '../config';

export const createDepartment = (name) => {
    return fetch(`${API}/departments/create`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(name)
	}).then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
}

export const getDepartments = () => {
	return fetch(`${API}/departments`, {
		method: 'GET'
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const deleteDepartment = (departmentId) => {
	return fetch(`${API}/departments/delete/${departmentId}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getDepartment = (departmentId) => {
	return fetch(`${API}/departments/${departmentId}`, {
		method: 'GET'
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateDepartment = (departmentId, department) => {
    return fetch(`${API}/departments/update/${departmentId}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(department)
    }).then((response) => {
		return response.json();
    }).catch((err) => {
        return console.log(err);
    })
}


export const createEmployee = (employee) => {
    return fetch(`${API}/employees/create`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(employee)
	}).then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
}

export const getEmployees = () => {
    return fetch(`${API}/employees`, {
        method: 'get',
        headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    })
}

export const readEmployee = (employeeId) => {
	return fetch(`${API}/employees/${employeeId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateEmployee = (employeeId, employee) => {
	return fetch(`${API}/employees/update/${employeeId}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(employee)
	}).then((response) => {
		return response.json();
	}).catch((err) => {
		console.log(err)
	})
}