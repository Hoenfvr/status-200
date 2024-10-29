import { useEffect, useState } from 'react';
import axios from 'axios';

interface RoomInputs {
  room_name: string;
  room_type: string;
  room_size: string;
  floor: string;
  building_id: string;
  status_active: string;
  update_by: string;
  update_date: string;
}

interface Building {
  id: string;
  name: string;
}

interface EditRoomProps {
  roomId: string;
  onClose: () => void;
}

function EditRoom({ roomId, onClose }: EditRoomProps) {
  /*เมื่อกดปุ่ม Edit แล้วให้แสดง popup form EditRoom*/
  const [inputs, setInputs] = useState<RoomInputs>({
    room_name: '',
    room_type: '',
    room_size: '',
    floor: '',
    building_id: '',
    status_active: '',
    update_by: '',
    update_date: new Date().toISOString().split('T')[0],
  });

  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get<Building[]>('http://localhost/STATUS-200/buildings.php');
        setBuildings(response.data);
      } catch (error) {
        setError('Error fetching buildings!');
      }
    };

    const getMeetingRoom = async () => {
      try {
        const response = await axios.get<RoomInputs>(`http://localhost/STATUS-200/meeting_room/${roomId}`);
        setInputs(response.data);
      } catch (error) {
        setError('Error fetching meeting room data!');
      } finally {
        setLoading(false);
      }
    };

    fetchBuildings();
    getMeetingRoom();
  }, [roomId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleUpdateData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost/STATUS-200/meeting_room/${roomId}/update`, inputs);
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
      <h1>Update Meeting Room</h1>
      <form onSubmit={handleUpdateData}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Room Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="room_name"
                  className="text-input"
                  value={inputs.room_name}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Room Type:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="room_type"
                  className="text-input"
                  value={inputs.room_type}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Room Size:</label>
              </td>
              <td>
                <input
                  type="number"
                  name="room_size"
                  className="text-input"
                  value={inputs.room_size}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Floor:</label>
              </td>
              <td>
                <input
                  type="number"
                  name="floor"
                  className="text-input"
                  value={inputs.floor}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Building:</label>
              </td>
              <td>
                <select name="building_id" value={inputs.building_id} onChange={handleChange} required>
                  <option value="">Select a building</option>
                  {buildings.length > 0 ? (
                    buildings.map((building) => (
                      <option key={building.id} value={building.id}>
                        {building.id} {/* Assuming there's a name field */}
                      </option>
                    ))
                  ) : (
                    <option disabled>No buildings available</option>
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label>Status Active:</label>
              </td>
              <td>
                <select name="status_active" value={inputs.status_active} onChange={handleChange} required>
                  <option value="">Select status</option>
                  <option value="0">Active</option>
                  <option value="1">Inactive</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label>Updated By:</label>
              </td>
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

export default EditRoom;