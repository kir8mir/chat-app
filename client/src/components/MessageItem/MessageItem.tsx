import { FC, useState, useEffect } from 'react';
import './MessageItem.css';

interface Props {
  message: any;
  userName: string;
}

export const MessageItem: FC<Props> = ({ message, userName }) => {
  const [meta, setMeta] = useState(message.userName);

  return (
    <div className="message-wrapper">
      <span
        className="message-name"
        onMouseEnter={() => setMeta(message.time)}
        onMouseLeave={() => setMeta(message.userName)}
      >
        {meta}
      </span>
      <h3
        className='message-content'
      >
        {'' + message.message}
      </h3>
    </div>
  )
}