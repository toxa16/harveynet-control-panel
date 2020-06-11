import React from 'react';


export default function CameraImage({ machine }) {
  const { cameraImage } = machine.state;
  function renderImage() {
    const imgStyle = {
      width: '20rem',
      height: '20rem',
      objectFit: 'contain',
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
      width: '20rem',
      height: '20rem',
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
