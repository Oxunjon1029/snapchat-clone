import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import './Chats.css';
import { auth, db } from '../../firebase';
import Chat from '../../components/Chat/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/appSlice';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router';
import { resetCameraImage } from '../../features/cameraSlice';
const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const takeSnap = () => {
    dispatch(resetCameraImage())
    navigator('/');
  };
  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);
  return (
    <div className='chats'>
      <div className='chatsHeader'>
        <Avatar
          src={user?.profilePic}
          onClick={() => auth.signOut()}
          className='chatsAvatar'
        />
        <div className='chatsSearch'>
          <SearchIcon className="chatsSearchIcon" />
          <input type='text' placeholder='Friends' />
          <ChatBubbleIcon className='chatsChatIcon' />
        </div>
      </div>
      <div className='chatsPosts'>
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>
      <RadioButtonUncheckedIcon
        className='chatsTakePicIcon'
        onClick={takeSnap}
        fontSize='large'
      />
    </div>
  );
};

export default Chats;
