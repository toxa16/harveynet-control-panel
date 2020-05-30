import React from 'react';


export default function CameraImage({ machine }) {
  const { cameraImage } = machine.state;
  function renderImage() {
    const imgStyle = {
      width: '15rem',
      height: '15rem',
      objectFit: 'cover',
    };
    return (
      <img
        style={imgStyle}
        src={cameraImage}
        alt="camera"
      />
    );
  }
  function renderStub() {
    const style = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '15rem',
      height: '15rem',
      backgroundColor: 'lightgray',
      color: 'gray',
    }
    return (
      <div style={style}>camera off</div>
    );
  }
  if (!cameraImage) {
    return renderStub();
  } else {
    return renderImage();
  }
}
