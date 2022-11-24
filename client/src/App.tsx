import { useState } from 'react';
import { io } from 'socket.io-client';
import { Chat } from './components/Chat/Chat';

const socket = io('http://localhost:8080', { transports: ["websocket"] });

function App() {
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName && room) {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat
        ? <div className="logIn">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder='John Doe'
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder='Room ID'
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join a Room</button>
        </div>

        : <Chat socket={socket} room={room} userName={userName} />}
    </div>
  );
}

export default App;
