import { FC, useState, useEffect } from 'react';
import { MessageList } from '../MessageList/MessageList';
import {v4 as uuid} from 'uuid';

interface Props {
  socket: any;
  userName: string;
  room: string;
}

export const Chat: FC<Props> = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState<string[]>(['Hey', 'Bobobo']);

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
      setMessageList(value => [...value, messageData.message + `id: ${uuid()}`]);
    }
  };

  useEffect(() => {
    socket.on('res_message', (data: any) => {
      setMessageList(value => [...value, data.message]);
    });
  }, [socket])
  
  console.log('MessageList', messageList);
  
  return (
    <div>
      <div className="chat-header">
        <h3>The Chat</h3>
      </div>

      <div className="chat-body">
       <MessageList messageList={messageList} />
      </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder='Do you like to chat with me?'
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}