import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Chats from './pages/Chats/Chats';
import ChatView from './pages/ChatView/ChatView';
import Preview from './pages/Preview/Preview';
import WebcamCapture from './pages/WebcamCapture/WebcamCapture';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './pages/Login/Login';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className='app'>
      {!user ? (
        <Login />
      ) : (
        <>
          <img
            className='appLogo'
            src='https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg'
            alt=''
          />
          <div className='appBody'>
            <div className='appBodyBackground'>
              <Routes>
                <Route path='/chats/view' element={<ChatView />} />
                <Route path='/chats' element={<Chats />} />
                <Route path='/preview' element={<Preview />} />
                <Route index path='/' element={<WebcamCapture />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
