'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

function CreateRoom({ onClose }: { onClose: () => void }) {
  const [inputs, setInputs] = useState({
    room_name: '',
    room_type: '',
    room_size: '',
    floor: '',
    building_id: '',
    status_active: '',
    create_by: '',
    create_date: new Date().toISOString().split('T')[0],
  });

  const [buildings, setBuildings] = useState<any[]>([]); // Ensure buildings is an array
  const [loading, setLoading] = useState(false);
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchBuildings = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost/STATUS-200/buildings.php');
        console.log('Raw response from API:', response.data); // Log the raw response
        if (Array.isArray(response.data)) {
          setBuildings(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
          setBuildings([]); // Reset to empty array
        }
      } catch (error) {
        console.error('There was an error fetching the buildings!', error);
        setBuildings([]); // Reset to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchBuildings();
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

    const roomSize = Number(inputs.room_size);
    const floor = Number(inputs.floor);

    if (roomSize <= 0 || floor <= 0) {
      alert('Room size and floor must be positive numbers.');
      return;
    }

    setLoading(true); // Set loading state to true while submitting

    try {
      const response = await axios.post('http://localhost/STATUS-200/meeting_room.php', inputs);
      console.log('Response from API:', response.data);
      alert(response.data.message);
      if (response.data.status === 1) {
        onClose(); // Call onClose after successful creation
        //navigate('/'); // Navigate after successful creation
      }
    } catch (error) {
      console.error('There was an error submitting the form!', error);
      alert('There was an error submitting the form!');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h2>Create Room</h2>
      <form onSubmit={handleAddData}>
        <div>
          <label>Room Name:</label>
          <input type="text" name="room_name" className="text-input" onChange={handleChange} required />
        </div>
        <div>
          <label>Room Type:</label>
          <input type="text" name="room_type" className="text-input" onChange={handleChange} required />
        </div>
        <div>
          <label>Room Size:</label>
          <input type="number" name="room_size" className="text-input" onChange={handleChange} required />
        </div>
        <div>
          <label>Floor:</label>
          <input type="number" name="floor" className="text-input" onChange={handleChange} required />
        </div>
        <div>
          <label>Building:</label>
          <select
            name="building_id"
            value={inputs.building_id}
            onChange={handleChange} // Use handleChange for select as well
            required
          >
            <option value="">Select a building</option>
            {buildings.length > 0 ? (
              buildings.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.id} {/* Adjust based on your building object structure */}
                </option>
              ))
            ) : (
              <option disabled>No buildings available</option>
            )}
          </select>
        </div>
        <div>
          <label>Status Active:</label>
          <select name="status_active" onChange={handleChange} required>
            <option value="">Select status</option>
            <option value="0">active</option>
            <option value="1">inactive</option>
          </select>
        </div>
        <div>
          <label>Create By:</label>
          <input type="text" name="create_by" className="text-input" onChange={handleChange} required />
        </div>
        <div>
          <label>Create Date:</label>
          <input type="date" name="create_date" className="text-input" onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Room'}
        </button>
      </form>
    </div>
  );
}

export default CreateRoom;
