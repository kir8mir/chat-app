import classNames from 'classnames';
import { FC, useState, useEffect } from 'react';
import { Menu } from '../Menu/Menu';
import { MessageList } from '../MessageList/MessageList';

import './Chat.css';

interface Props {
  socket: any;
  userName: string;
  room: string;
}

export const Chat: FC<Props> = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState<object[]>([]);
  const [togglMenu, setTogglMenu] = useState(false);

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
    <div
      className={classNames('chat', {'chat-rainbow': togglMenu})}
    >
      <div
        className="chat__header"
        onClick={() => setTogglMenu(value => !value)}
      >
        <h3 className="chat__header-title">The Chat</h3>
      </div>

      
      {/* I want to try implement some menu logic, so I need this comment
      
      {togglMenu &&
      <Menu messageList={messageList} />} */}

      <div className="chat__body">
        <MessageList messageList={messageList} userName={userName} />
      </div>

      <div className="chat__footer">
        <input
          className="chat__footer-input"
          type="text"
          placeholder='Do you like to chat with me?'
          value={currentMessage}
          onKeyPress={handleKeyDown}
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