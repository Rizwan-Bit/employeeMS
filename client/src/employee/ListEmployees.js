import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import {getEmployees} from '../api'

const ManageEmployees = () => {

  const [employess, setEmployees] = useState([]);

  const loadEmployees = () => {
    getEmployees().then((data) => {
      if(data.error){
        console.log(data.error)
      }else{
        setEmployees(data)
      }
    })
  }


  useEffect(() => {
      loadEmployees();
  }, []);

  return( 
    <div className="container">
          <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {employess.length} employess
                    </h2>
                    <hr />
                    <ul className="list-group">
                        <li className="list-group-item align-items-center">
                          <strong className="font ml-5 mr-5">Name</strong>
                          <strong className="font ml-5 mr-5">Surname</strong>
                          <strong className="font ml-5 mr-5">Address</strong>
                          <strong className="font ml-5 mr-5">Qualification</strong>
                          <strong className="font ml-5 mr-5">Contact Number</strong>
                        </li>
                        {employess.map((e, i) => (
                            <li
                                key={i}
                                className="list-group-item  align-items-center"
                            >
                                <strong className="font ml-5 mr-5">{e.name}</strong>
                                <strong className="font ml-5 mr-5">{e.surname}</strong>
                                <strong className="font ml-5 mr-5">{e.address}</strong>
                                <strong className="font ml-5 mr-5">{e.qualification}</strong>
                                <strong className="font ml-5 mr-5">{e.contactNumber}</strong>
                                <Link to={`/employees/update/${e._id}`}>
                                    <span className="badge badge-info font badge-pill justify-content-around mt-3 ml-5 mr-5">
                                        Edit
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <br />
                    </div>
            </div>
    </div>
  )
}

export default ManageEmployees;