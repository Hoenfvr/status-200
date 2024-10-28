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

function EditRoom({ roomId, onClose }: EditRoomProps) {/*เมื่อกดปุ่ม Edit แล้วให้แสดง popup form EditRoom*/
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
        const response = await axios.get<Building[]>('http://localhost/STATUS-200-Gun/buildings.php');
        setBuildings(response.data);
      } catch (error) {
        setError('Error fetching buildings!');
      }
    };

    const getMeetingRoom = async () => {
      try {
        const response = await axios.get<RoomInputs>(`http://localhost/STATUS-200-Gun/meeting_room/${roomId}`);
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
      await axios.put(`http://localhost/STATUS-200-Gun/meeting_room/${roomId}/update`, inputs);
      onClose(); // Close modal after updating
    } catch (error) {
      setError('Error updating meeting room data!');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleUpdateData}>
      {error && <p className="text-danger">{error}</p>}
      {/* Add your form fields here, similar to the previous example */}
      {/* Example field */}
      <div>
        <label>Room Name:</label>
        <input type="text" name="room_name" value={inputs.room_name} onChange={handleChange} required />
      </div>
      {/* Add other fields similarly */}
      <button type="submit">Update Room</button>
    </form>
  );
}

export default EditRoom;
