import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import EmpProfileModal from './EmpProfileModal';

const EmpListing = () => {
    const [APIData, setAPIData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const getData = () => {
        axios.get(`http://localhost:3001/employee`)
            .then((response) => {
                setAPIData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
            });
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:3001/employee/${id}`)
            .then(() => {
                getData();
            })
            .catch((error) => {
                console.error('Error deleting employee:', error);
            });
    }
    const setData = (data) => {
        let { id, name, department,age,gender,salary,yearsOfExperience } = data;
        localStorage.setItem('EmpId', id);
        localStorage.setItem('Name', name);
        localStorage.setItem('Department', department);
        localStorage.setItem('Age', age);
        localStorage.setItem('Gender', gender);
        localStorage.setItem('Salary', salary);
        localStorage.setItem('Experience', yearsOfExperience);
     
    }

    useEffect(() => {
        getData();
    }, []);

    const handleDetailsClick = (employee) => {
        setSelectedEmployee(employee);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container className="container-center">
            <div className="card-title">
                <h2>EMPLOYEE DETAILS</h2>
            </div>
            <div className="card-body">
                <div className="divbtn">
                    <Link to="employee/create" className="btn btn-success">Add New Employee</Link>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {APIData.map(data => (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.department}</td>
                                    <td>
                                        <Link to='/Empupdate'>
                                        <button onClick={() => setData(data)} className="btn btn-success">Edit</button>
                                        </Link>
                                        <button onClick={() => onDelete(data.id)} className="btn btn-danger">Delete</button>
                                        <button onClick={() => handleDetailsClick(data)} className="btn btn-primary">Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Details Modal */}
            <EmpProfileModal 
                employee={selectedEmployee} 
                showModal={showModal} 
                handleCloseModal={handleCloseModal} 
            />
        </Container>
    );
}

export default EmpListing;
