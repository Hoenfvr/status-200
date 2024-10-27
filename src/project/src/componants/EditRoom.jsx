import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditRoom() {
  const [inputs, setInputs] = useState({
    update_by: "",
    update_date: new Date().toISOString().split("T")[0],
  });
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get(
          "http://localhost/MINI_PROJECT/buildings.php"
        );
        setBuildings(response.data);
        console.log("Buildings fetched:", response.data);
      } catch (error) {
        console.error("There was an error fetching the buildings!", error);
      } finally {
        setLoading(false);
      }
    };

    const getMeetingRoom = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost/MINI_PROJECT/meeting_room/${id}`
          );
          setInputs(response.data);
        } catch (error) {
          console.error("Error fetching meeting room data:", error);
        }
      }
    };

    fetchBuildings();
    getMeetingRoom();
  }, [id]); // Added `id` as a dependency

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

const handleUpdateData = (event) => {
  event.preventDefault(); // ป้องกันการโหลดหน้าเพจใหม่
  axios
    .put(`http://localhost/MINI_PROJECT/meeting_room/${id}/update`, inputs)
    .then(function (response) {
      console.log(response.data);
      navigate("/");
    });
};

if (loading) {
  return <p>Loading buildings...</p>;
}


  return (
    <div>
      <h1>Update Meeting Room</h1>

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
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Building:</label>
            </td>
            <td>
              <select
                name="building_id"
                value={inputs.building_id}
                onChange={(e) => handleChange(e)}
                required
              >
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
              <select
                name="status_active"
                value={inputs.status_active}
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="">Select status</option>
                <option value="0">Active</option>
                <option value="1">Inactive</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>update_by:</label>
            </td>
            <td>
              <input
                type="text"
                name="update_by"
                className="text-input"
                value={inputs.update_by}
                onChange={(e) => handleChange(e)}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>update_date:</label>
            </td>
            <td>
              <input
                type="date"
                name="update_date"
                className="text-input"
                value={inputs.update_date}
                onChange={(e) => handleChange(e)}
                required
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button
                onClick={handleUpdateData}
                type="submit"
                className="btn btn-primary"
              >
                {id ? "Update Data" : "Add Room"}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EditRoom;
