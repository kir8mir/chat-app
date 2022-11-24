import { useState } from 'react';
import { io } from 'socket.io-client';
import { Chat } from './components/Chat/Chat';
import { Login } from './components/Login/Login';
import './styles/reset.css';
import './styles/index.css';

const socket = io('https://kir8mir-chat-server.herokuapp.com', { transports: ["websocket"] });

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
        ? <Login setUserName={setUserName} setRoom={setRoom} joinRoom={joinRoom} room={room} userName={userName} />

        : <Chat socket={socket} room={room} userName={userName} />}
    </div>
  );
}

export default App;
