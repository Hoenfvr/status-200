import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListRoom() {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  async function getRoom() {
    try {
      const response = await axios.get(
        "http://localhost/MINI_PROJECT/index.php/"
      );
      setRoom(response.data); 
      setLoading(false); 
    } catch (error) {
      console.error("There was an error fetching the room data:", error);
      setError("Failed to fetch room data. Please try again later."); 
      setLoading(false); 
    }
  }


  useEffect(() => {
    getRoom();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost/MINI_PROJECT/meeting_room/${id}`);
        setRoom(room.filter((meeting_room) => meeting_room.id !== id)); 
      } catch (error) {
        console.error("Error deleting room:", error);
        setError("Failed to delete room. Please try again later.");
      }
    }
  };

  return (
    <div>
      <h2>List of Rooms</h2>
      <Link to="listroom/create">
        <button className="btn btn-info">Add Data</button>
      </Link>
      {loading ? (
        <p>Loading rooms...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Size</th>
              <th>Floor</th>
              <th>Building ID</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Created Date</th>
              <th>Updated By</th>
              <th>Updated Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {room.length > 0 ? (
              room.map((meeting_room) => (
                <tr key={meeting_room.id}>
                  <td>{meeting_room.id}</td>
                  <td>{meeting_room.room_name}</td>
                  <td>{meeting_room.room_type}</td>
                  <td>{meeting_room.room_size}</td>
                  <td>{meeting_room.floor}</td>
                  <td>{meeting_room.building_id}</td>
                  <td>{meeting_room.status_active}</td>
                  <td>{meeting_room.create_by}</td>
                  <td>{meeting_room.create_date}</td>
                  <td>{meeting_room.update_by}</td>
                  <td>{meeting_room.update_date}</td>
                  <td>
                    <button className="btn btn-warning">
                      <Link
                        to={`listroom/${meeting_room.id}/update`}
                        style={{ color: "white" }}
                      >
                        Edit
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(meeting_room.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListRoom;
