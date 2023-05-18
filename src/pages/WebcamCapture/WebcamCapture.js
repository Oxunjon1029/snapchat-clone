import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from '../../features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import './WebcamCapture.css';
const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: 'user',
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigator('/preview');
  }, [webcamRef, dispatch, navigator]);
  return (
    <div className='webcamCapture'>
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />
      <RadioButtonUncheckedIcon
        className='webcamCaptureBtn'
        onClick={capture}
        fontSize='large'
      />
    </div>
  );
};
export default WebcamCapture;
