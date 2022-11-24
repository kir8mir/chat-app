import { FC, useState, useEffect } from 'react';
import './MessageItem.css';

interface Props {
  message: any;
  userName: string;
}

export const MessageItem:FC<Props> = ({ message, userName }) => {
  return <h3>{`${message.userName}: ${message.message}: ${message.time}`}</h3>
}