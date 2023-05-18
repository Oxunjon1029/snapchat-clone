import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/appSlice';
import { auth, provider } from '../../firebase';
import './Login.css';
const Login = () => {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        dispatch(
          login({
            username: res.user.displayName,
            profilePic: res.user.photoURL,
            id: res.user.uid,
          })
        );
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className='login'>
      <div className='loginContainer'>
        <img src='https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg' alt='' />
        <Button variant='outlined' onClick={signIn}>
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default Login;
