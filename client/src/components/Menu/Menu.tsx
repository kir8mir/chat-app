import { FC, useState, useEffect } from 'react';
import './Menu.css';
import { v4 as uuid } from 'uuid';

interface Props {
  messageList: object[];
}

export const Menu: FC<Props> = ({ messageList }) => {

  return (
    <div className="menu">
      <div className="menu__users">
        {messageList.map((user: any) => (
          messageList.some(({ userName }: any) => (
            user.userName === userName
          ))
            ?  <div key={uuid()} className="menu__user" > 111 </div>
            : <div key={uuid()} className="menu__user" > {user.userName}</div>
        ))}
      </div>
    </div >
  );
}