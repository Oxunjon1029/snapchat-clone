import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './ChatView.css';
import { selectSelectedImage } from '../../features/appSlice';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
const ChatView = () => {
  const selectedImage = useSelector(selectSelectedImage);
  const navigator = useNavigate();
  const exit = () => {
    navigator('/chats');
  };

  useEffect(() => {
    if (!selectedImage) {
      navigator('/chats');
    }
  }, [selectedImage, navigator]);
  return (
    <div className='chatView'>
      <div className='chatViewTimer'>
        <CountdownCircleTimer
          duration={10}
          isPlaying
          strokeWidth={6}
          size={50}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[10, 6, 2, 0]}>
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
      <img src={selectedImage} onClick={exit} alt='' />
    </div>
  );
};

export default ChatView;
