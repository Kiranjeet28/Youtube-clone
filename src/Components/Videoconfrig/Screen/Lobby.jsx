import React, { useCallback, useState, useEffect } from 'react';
import { useSocket } from '../Context/SocketProvider';
import { useNavigate } from 'react-router-dom';

const Lobby = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    // Generate 3 random room ID suggestions
    const generateSuggestions = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
      const suggestions = [];
      for (let i = 0; i < 3; i++) {
        let suggestion = '';
        for (let j = 0; j < 6; j++) {
          suggestion += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        suggestions.push(suggestion);
      }
      return suggestions;
    };
    setSuggestions(generateSuggestions());
  }, []);

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    setShowForm(true); // Show the form once the component is mounted
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-red-400">
      <h1 className="text-3xl font-bold text-white mb-8">Let's Start Funnn</h1>
      <form
        onSubmit={handleSubmitForm}
        className={`bg-white rounded-lg shadow-md p-8 max-w-md w-full transition-opacity ${
          showForm ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email ID</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full  rounded px-4 py-2 focus:border-red-400 border-2 border-red-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="room" className="block text-gray-700 font-bold mb-2">Room Number</label>
          <input
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full  rounded px-4 py-2  focus:border-red-400 border-2 border-red-700"
          />
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-bold mb-2 w-auto">Suggestions:</p>
          <ul className='w-auto flex flex-row'>
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-gray-700 border-2 border-gray-200 w-auto rounded-full m-auto p-1">{suggestion}</li>
            ))}
          </ul>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          Join
        </button>
      </form>
    </div>
  );
};

export default Lobby;
