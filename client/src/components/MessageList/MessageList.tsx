import { FC } from 'react';
import { MessageItem } from '../MessageItem/MessageItem';
import { v4 as uuid } from 'uuid';
import './MessageList.css';

interface Props {
  messageList: any;
  userName: string;
}

export const MessageList: FC<Props> = ({ messageList, userName }) => {
  return (
    messageList.map((message: any) => {

      return (
        <div
          className="message"
          id={userName === message.userName ? 'you' : 'other'}
        >
          <MessageItem key={uuid()} message={message} userName={userName} />
        </div>
      )
    })
  );
}