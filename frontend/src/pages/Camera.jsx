import React, { useState, useEffect, useRef } from 'react';
import ROSLIB from 'roslib';

const Camera = ({ rosInstance, rosConnected }) => {
  const [cameraHeight, setCameraHeight] = useState(0);
  const [cameraWidth, setCameraWidth] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false); // Toggle state for camera
  const canvasRef = useRef(null);

  useEffect(() => {
    let imageTopic;

    if (rosConnected && rosInstance && isCameraActive) {
      imageTopic = new ROSLIB.Topic({
        ros: rosInstance,
        name: 'mavs_ros/image',
        messageType: 'sensor_msgs/Image',
      });

      imageTopic.subscribe((message) => {
        console.log('Received image message:', message);
        if (message.data && message.height && message.width) {
          const scaleFactor = 1.5; // Change to adjust canvas scaling
          drawCanvas(message, canvasRef, scaleFactor);
          setCameraHeight(message.height * scaleFactor);
          setCameraWidth(message.width * scaleFactor);
        } else {
          console.error('Invalid message data:', message);
        }
      });
    }

    // Cleanup subscription on component unmount or toggle off
    return () => {
      if (imageTopic) {
        imageTopic.unsubscribe();
        console.log('Camera subscription stopped.');
      }
    };
  }, [rosConnected, rosInstance, isCameraActive]);

  const toggleCamera = () => {
    setIsCameraActive((prev) => !prev);
  };

  if (!rosConnected) {
    return <div>ROS is not connected. Please check your connection.</div>;
  }

  return (
    <div className="card" id="Camera-card">
      <h3 className="card-title">Camera</h3>
      <button onClick={toggleCamera} className="toggle-button">
        {isCameraActive ? 'Stop Camera' : 'Start Camera'}
      </button>
      {isCameraActive && (
        <canvas
          className="card-img"
          ref={canvasRef}
          width={cameraWidth}
          height={cameraHeight}
        />
      )}
      {!isCameraActive && <div>Camera feed is inactive. Click "Start Camera" to view.</div>}
    </div>
  );
};

function drawCanvas(message, canvasRef, scale) {
  // Decode the string into raw bytes
  const byteArray = Uint8Array.from(atob(message.data), (c) => c.charCodeAt(0));
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");

  canvas.width = message.width * scale;
  canvas.height = message.height * scale;

  const imageData = context.createImageData(message.width, message.height);
  const data = imageData.data;

  for (let i = 0; i < byteArray.length; i += 3) {
    const canvasIndex = (i / 3) * 4;
    data[canvasIndex] = byteArray[i]; // Red
    data[canvasIndex + 1] = byteArray[i + 1]; // Green
    data[canvasIndex + 2] = byteArray[i + 2]; // Blue
    data[canvasIndex + 3] = 255; // Alpha
  }

  context.putImageData(imageData, 0, 0);
}

export default Camera;
