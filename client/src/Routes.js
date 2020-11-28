import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './cors/Home'
import Menu from './cors/Menu'
import AddDepartment from './department/AddDepartment'
import ManageDepartment from './department/ListDepartments'
import UpdateDepartment from './department/UpdateDepartment'
import AddEmployee from './employee/AddEmployee'
import ManageEmployees from './employee/ListEmployees'
import UpdateEmployee from './employee/UpdateEmplyee'


const Routes = () => {
	return (
		<BrowserRouter>
			<Menu />
			<Switch>
                        <Route path="/" exact component={Home} />
						<Route path="/departments" exact component={ManageDepartment} />
						<Route path="/departments/create" exact component={AddDepartment} />
						<Route path="/departments/update/:departmentId" exact component={UpdateDepartment} />
						<Route path="/employees" exact component={ManageEmployees} />
						<Route path="/employees/create" exact component={AddEmployee} />
						<Route path="/employees/update/:employeeId" exact component={UpdateEmployee} />
            </Switch>
        </BrowserRouter>
	);
};

export default Routes;