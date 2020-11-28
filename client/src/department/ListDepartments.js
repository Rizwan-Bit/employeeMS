import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import {getDepartments, deleteDepartment} from '../api'

const ManageDepartments = () => {

  const [departments, setDepartments] = useState([]);

  const loadDepartments = () => {
    getDepartments().then((data) => {
      if(data.error){
        console.log(data.error)
      }else{
        setDepartments(data)
      }
    })
  }

  const destroy = departmentId => {
        deleteDepartment(departmentId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadDepartments();
            }
        });
    };

  useEffect(() => {
      loadDepartments();
  }, []);

  return( 
    <div className="container">
          <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {departments.length} departments
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {departments.map((d, i) => (
                            <li
                                key={i}
                                className="list-group-item  align-items-center"
                            >
                                <strong className="font">{d.name}</strong>
                                <Link to={`/departments/update/${d._id}`}>
                                    <span className="badge badge-info font badge-pill d-flex justify-content-around mt-3">
                                        Update
                                    </span>
                                </Link>
                                <span
                                    onClick={() => destroy(d._id)}
                                    className="badge badge-danger font badge-pill d-flex justify-content-center mt-3"
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                    <br />
                    </div>
            </div>
    </div>
  )
}

export default ManageDepartments;