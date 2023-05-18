import React from 'react';
import { Avatar } from '@mui/material';
import './Chat.css';
import { StopRounded } from '@mui/icons-material';
import ReactTimeago from 'react-timeago';
import { useDispatch } from 'react-redux';
import { selectImage } from '../../features/appSlice';
import { db } from '../../firebase';
import { useNavigate } from 'react-router';
const Chat = ({ id, username, read, timestamp, imageUrl, profilePic }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection('posts').doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      navigator('/chats/view');
    }
  };
  return (
    <div onClick={open} className='chat'>
      <Avatar className='chatAvatar' src={profilePic} />
      <div className='chatInfo'>
        <h4>{username}</h4>
        <p>
          {!read && 'Tap to view - '}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>
      {!read && <StopRounded className='chatReadIcon' />}
    </div>
  );
};

export default Chat;
