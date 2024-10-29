import { useEffect, useState } from 'react';
import axios from 'axios';

interface EmpInputs {
  id: string;
  fnameth: string;
  lnameth: string;
  fnameen: string;
  lnameen: string;
  position: string;
  department_id: string;
  update_by: string;
  update_date: string;
}

interface Department {
  id: string;
  name: string;
}

interface EditEmpProps {
  employeeId: string;
  onClose: () => void;
}

function EditEmployee({ employeeId, onClose }: EditEmpProps) {
  /*เมื่อกดปุ่ม Edit แล้วให้แสดง popup form EditRoom*/
  const [inputs, setInputs] = useState<EmpInputs>({
    id: '',
    fnameth: '',
    lnameth: '',
    fnameen: '',
    lnameen: '',
    position: '',
    department_id: '',
    update_by: '',
    update_date: new Date().toISOString().split('T')[0],
  });

  const [department, setDepartment] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get<Department[]>('http://localhost/STATUS-200/department.php');
        setDepartment(response.data);
      } catch (error) {
        setError('Error fetching Department!');
      }
    };

    const getMeetingEmp = async () => {
      try {
        const response = await axios.get<EmpInputs>(`http://localhost/STATUS-200/employee_info/${employeeId}`);
        setInputs(response.data);
      } catch (error) {
        setError('Error fetching meeting room data!');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
    getMeetingEmp();
  }, [employeeId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleUpdateData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost/STATUS-200/meeting_room/${employeeId}/update`, inputs);
      onClose(); // Close modal after updating
    } catch (error) {
      setError('Error updating meeting room data!');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Update Employee</h1>
      <form onSubmit={handleUpdateData}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>ID:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="id"
                  className="text-input"
                  value={inputs.id}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Fname TH:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="fnameth"
                  className="text-input"
                  value={inputs.fnameth}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>LName TH:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="lnameth"
                  className="text-input"
                  value={inputs.lnameth}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Fname EN:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="fnameen"
                  className="text-input"
                  value={inputs.fnameen}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>LName EN:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="lnameth"
                  className="text-input"
                  value={inputs.lnameen}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Position:</label>
              </td>
              <td>
                <input
                  type="number"
                  name="position"
                  className="text-input"
                  value={inputs.position}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>department:</label>
              </td>
              <td>
                <select name="department_id" value={inputs.department_id} onChange={handleChange} required>
                  <option value="">Select a department</option>
                  {department.length > 0 ? (
                    department.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.id} {/* Assuming there's a name field */}
                      </option>
                    ))
                  ) : (
                    <option disabled>No department available</option>
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  name="update_by"
                  className="text-input"
                  value={inputs.update_by}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Update Date:</label>
              </td>
              <td>
                <input
                  type="date"
                  name="update_date"
                  className="text-input"
                  value={inputs.update_date}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button type="submit" className="btn btn-primary">
                  Update Data
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default EditEmployee;
