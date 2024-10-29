'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

import CreateEmployee from './CreateEmployee';
import EditEmployee from './EditEmployee';

interface Employee {
  id: string;
  fnameth: string;
  lnameth: string;
  fnameen: string;
  lnameen: string;
  position: string;
  department_id: string;
  create_by: string;
  create_date: string;
  update_by: string;
  update_date: string;
}

const EmployeeManagement: React.FC = () => {
  const [employee_info, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editEmployeeId, setEditEmployeeId] = useState<string | null>(null);

  const getEmployees = async () => {
    try {
      const response = await axios.get<Employee[]>('http://localhost/STATUS-200/employee.php/');
      setEmployees(response.data);
    } catch (error) {
      console.error('There was an error fetching the employee data:', error);
      setError('Failed to fetch employee data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost/STATUS-200/employee_info/${id}`);
        setEmployees(employee_info.filter((employee) => employee.id !== id));
      } catch (error) {
        console.error('Error deleting employee:', error);
        setError('Failed to delete employee. Please try again later.');
      }
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditEmployeeId(null);
  };

  const handleEditEmployee = (id: string) => {
    setEditEmployeeId(id);
    handleOpenModal();
  };

  return (
    <div>
      <h2>List of Employees</h2>
      <button onClick={handleOpenModal} className="btn btn-info">
        Add Employee
      </button>
      {loading ? (
        <p>Loading employees...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name (TH)</th>
              <th>Last Name (TH)</th>
              <th>First Name (EN)</th>
              <th>Last Name (EN)</th>
              <th>Position</th>
              <th>Department ID</th>
              <th>Created By</th>
              <th>Created Date</th>
              <th>Updated By</th>
              <th>Updated Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {employee_info.length > 0 ? (
              employee_info.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.fnameth}</td>
                  <td>{employee.lnameth}</td>
                  <td>{employee.fnameen}</td>
                  <td>{employee.lnameen}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department_id}</td>
                  <td>{employee.create_by}</td>
                  <td>{employee.create_date}</td>
                  <td>{employee.update_by}</td>
                  <td>{employee.update_date}</td>
                  <td>
                    <Link href={`employee/${employee.id}/update`}>
                      <button className="btn btn-warning" onClick={() => handleEditEmployee(employee.id)}>
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(employee.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={13}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={handleCloseModal} className="close-modal">
              X
            </button>
            {editEmployeeId ? (
              <EditEmployee employeeId={editEmployeeId} onClose={handleCloseModal} />
            ) : (
              <CreateEmployee onClose={handleCloseModal} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
