import { FC, useState, useEffect } from 'react';
import { MessageList } from '../MessageList/MessageList';
import {v4 as uuid} from 'uuid';
import './Chat.css';

interface Props {
  socket: any;
  userName: string;
  room: string;
}

export const Chat: FC<Props> = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState<object[]>([]);

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
        <h3>{`Welcome, ${userName} in the ${room} room`}</h3>
      </div>

      <div className="chat__body">
       <MessageList messageList={messageList} userName={userName}/>
      </div>

      <div className="chat__footer">
        <input
        className="chat__footer-input"
          type="text"
          placeholder='Do you like to chat with me?'
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />

        <button className="chat__footer-btn" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}