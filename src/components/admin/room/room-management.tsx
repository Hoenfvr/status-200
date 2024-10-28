'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

import CreateRoom from './CreateRoom';
import EditRoom from './EditRoom'; // import EditRoom

interface Room {
  id: string;
  room_name: string;
  room_type: string;
  room_size: number;
  floor: number;
  building_id: string;
  status_active: string;
  create_by: string;
  create_date: string;
  update_by: string;
  update_date: string;
}

function RoomManagement() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to manage modal visibility
  const [editRoomId, setEditRoomId] = useState<string | null>(null);

  const getRoom = async () => {
    try {
      const response = await axios.get<Room[]>('http://localhost/STATUS-200-Gun/index.php/');
      setRooms(response.data);
    } catch (error) {
      console.error('There was an error fetching the room data:', error);
      setError('Failed to fetch room data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoom();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this room?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost/STATUS-200-Gun/meeting_room/${id}`);
        setRooms(rooms.filter((room) => room.id !== id));
      } catch (error) {
        console.error('Error deleting room:', error);
        setError('Failed to delete room. Please try again later.');
      }
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditRoomId(null);
  };

  const handleEditRoom = (id: string) => {
    setEditRoomId(id);
    handleOpenModal(); // Open modal when editing a room
  };

  return (
    <div>
      <h2>List of Rooms</h2>
      <button onClick={handleOpenModal} className="btn btn-info">
        Add Data
      </button>
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
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.id}</td>
                  <td>{room.room_name}</td>
                  <td>{room.room_type}</td>
                  <td>{room.room_size}</td>
                  <td>{room.floor}</td>
                  <td>{room.building_id}</td>
                  <td>{room.status_active}</td>
                  <td>{room.create_by}</td>
                  <td>{room.create_date}</td>
                  <td>{room.update_by}</td>
                  <td>{room.update_date}</td>
                  <td>
                    <Link href={`listroom/${room.id}/update`}>
                      <button className="btn btn-warning" onClick={() => handleEditRoom(room.id)}>
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(room.id)}>
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
            {editRoomId ? (
              <EditRoom roomId={editRoomId} onClose={handleCloseModal} />
            ) : (
              <CreateRoom onClose={handleCloseModal} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomManagement;
