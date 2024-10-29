'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';





function CreateRoom({ onClose }: { onClose: () => void }) {
  const [inputs, setInputs] = useState({
    id: '',
    fnameth: '',
    lnameth: '',
    fnameen: '',
    lnameen: '',
    position: '',
    department_id: '',
    create_by: '',
    create_date: new Date().toISOString().split('T')[0],
  });

  const [department, setDepartment] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchDepartment = async () => {
        setLoading(true);
        try {
          const response = await axios.get('http://localhost/STATUS-200/department.php');
          console.log('Raw response from API:', response.data); // Log the raw response
          if (Array.isArray(response.data)) {
            setDepartment(response.data);
          } else {
            console.error('Expected an array but got:', response.data);
            setDepartment([]); // Reset to empty array
          }
        } catch (error) {
          console.error('There was an error fetching!', error);
          setDepartment([]); // Reset to empty array on error
        } finally {
          setLoading(false);
        }
      };

      fetchDepartment();
    }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitting data:', inputs);

    for (const key of Object.keys(inputs) as (keyof typeof inputs)[]) {
      if (inputs[key] === '' || inputs[key] === null) {
        alert(`Please fill out the ${key} field.`);
        return;
      }
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost/STATUS-200/employee_info.php', inputs);
      console.log('Response from API:', response.data);
      alert(response.data.message);
      if (response.data.status === 1) {
        onClose();
      }
    } catch (error) {
      console.error('There was an error submitting the form!', error);
      alert('There was an error submitting the form!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Employee</h1>
      <form onSubmit={handleAddData}>
        <table>
          <tbody>
            <tr>
              <th>
                <label>ID:</label>
              </th>
              <td>
                <input type="text" name="id" className="text-input" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
                <label>First Name TH:</label>
              </th>
              <td>
                <input type="text" name="fnameth" className="text-input" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
                <label>Last Name TH:</label>
              </th>
              <td>
                <input type="text" name="lnameth" className="text-input" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
                <label>First Name EN:</label>
              </th>
              <td>
                <input type="text" name="fnameen" className="text-input" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
                <label>Last Name EN:</label>
              </th>
              <td>
                <input type="text" name="lnameen" className="text-input" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
                <label>Position:</label>
              </th>
              <td>
                <input type="text" name="position" className="text-input" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
                <label>Department ID:</label>
              </th>
              <td>
                <div>
       {/* <input type="text" name="department_id" className="text-input" onChange={handleChange} /> */}
          <select
            name="department_id"
            value={inputs.department_id}
            onChange={handleChange} // Use handleChange for select as well
            required
          >
            <option value="">Select a department </option>
            {department.length > 0 ? (
              department.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.id} {/* Adjust based on your building object structure */}
                </option>
              ))
            ) : (
              <option disabled>No department available</option>
            )}
          </select>
        </div>
              </td>
            </tr>
            <tr>
              <th>
                <label>Create By:</label>
              </th>
              <td>
                <input type="text" name="create_by" className="text-input" onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <th>
                <label>Create Date:</label>
              </th>
              <td>
                <input type="date" name="create_date" className="text-input" onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button type="submit" className="btn btn-primary">
                  {loading ? 'Submitting...' : 'Add Data'}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default CreateRoom;