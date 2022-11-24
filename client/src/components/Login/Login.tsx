import { FC } from 'react';
import './Login.css';
import classnames from 'classnames';

interface Props {
  joinRoom: () => void;
  setUserName: any;
  setRoom: any;
  userName: string;
  room: string;
}

export const Login: FC<Props> = ({ joinRoom, setUserName, setRoom, userName, room }) => {

  return (
    <div className="login">
      <h3 className="login__title">Keep In Touch</h3>
      <input
        className="login__input"
        type="text"
        placeholder='Your Name'
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <input
        className="login__input"
        type="text"
        placeholder='Room ID'
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button
        className={classnames(
          'login__input',
          'login_btn',
          {'login__red-btn': !userName || !room},
          {'login__green-btn': userName && room},
          )}
        onClick={joinRoom}
      >
        Join a Room</button>
    </div>
  );
}