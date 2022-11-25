import { FC, useState, useEffect } from 'react';
import { MessageList } from '../MessageList/MessageList';
import GridLayout from "react-grid-layout";

import './Chat.css';

interface Props {
  socket: any;
  userName: string;
  room: string;
}

export const Chat: FC<Props> = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState<object[]>([]);
  
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 }
  ];

  const sendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        room,
        userName,
        message: currentMessage,
        time: new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      setMessageList(value => [...value, messageData]);
      setCurrentMessage('');
    }
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }
  useEffect(() => {
    socket.on('res_message', (data: any) => {
      setMessageList(value => [...value, data]);
    });
  }, [socket])


  return (
    <div className="chat">
      <div className="chat__header">
        <h3 className="chat__header-title">Menu</h3>
      </div>

      <div className="chat__body">
        <MessageList messageList={messageList} userName={userName} />
      </div>

      <div className="chat__footer">
        <input
          className="chat__footer-input"
          type="text"
          placeholder='Do you like to chat with me?'
          value={currentMessage}
          onKeyPress ={handleKeyDown}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }
          }
        />

        <button
          className="chat__footer-btn"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}