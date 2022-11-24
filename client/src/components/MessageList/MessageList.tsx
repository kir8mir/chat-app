import { FC, useState, useEffect } from 'react';
import { MessageItem } from '../MessageItem/MessageItem';
import {v4 as uuid} from 'uuid';

interface Props {
  messageList: any;
}

export const MessageList:FC<Props> = ({ messageList }) => {
  return (
    messageList.map((message: string) => {

      return <MessageItem key={uuid()} message={message} />
    }) 
  );
}