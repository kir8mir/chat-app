import { FC, useState, useEffect } from 'react';

interface Props {
  message: string;
}

export const MessageItem:FC<Props> = ({ message }) => {
  return <h3>{`Mass: ${message}`}</h3>
}