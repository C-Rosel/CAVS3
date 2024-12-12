import React, { useState, useEffect, useRef } from 'react';
import ROSLIB from 'roslib';

const Camera = ({ rosInstance, rosConnected }) => {
  const [cameraHeight, setCameraHeight] = useState(0);
  const [cameraWidth, setCameraWidth] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log('rosConnected:', rosConnected);
    console.log('rosInstance:', rosInstance);
    
    if (rosConnected && rosInstance) {
      const imageTopic = new ROSLIB.Topic({
        ros: rosInstance,
        name: 'mavs_ros/image',
        messageType: 'sensor_msgs/Image',
      });

      imageTopic.subscribe((message) => {
        console.log('Received image message:', message);
        if (message.data && message.height && message.width) {
          let scaleFactor = 1.5; // Change to increase/decrease rendered camera canvas
          drawCanvas(message, canvasRef, scaleFactor);
          setCameraHeight(message.height * scaleFactor);
          setCameraWidth(message.width * scaleFactor);
        } else {
          console.error('Invalid message data:', message);
        }
      });

      // Cleanup subscription on component unmount
      return () => {
        imageTopic.unsubscribe();
      };
    }
  }, [rosConnected, rosInstance]);

  if (!rosConnected) {
    return <div>ROS is not connected. Please check your connection.</div>;
  }

  return (
    <div className="card" id="Camera-card">
      <h3 className="card-title">Camera from mavs_ros/image</h3>
      <canvas
        className="card-img"
        ref={canvasRef}
        width={cameraWidth}
        height={cameraHeight}
      />
      {cameraHeight === 0 && cameraWidth === 0 && (
        <div>Loading camera feed...</div>
      )}
    </div>
  );
};

function drawCanvas(message, canvasRef, scale) {
  const byteArray = new Uint8Array(message.data);
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');

  console.log('Drawing canvas with dimensions:', message.width, message.height);

  // Resize canvas
  canvas.width = message.width * scale;
  canvas.height = message.height * scale;

  const imageData = context.createImageData(message.width, message.height);
//   const imageData = new ImageData(byteArray, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < byteArray.length; i += 3) {
    const canvasIndex = (i / 3) * 4;
    data[canvasIndex] = byteArray[i]; // Red
    data[canvasIndex + 1] = byteArray[i + 1]; // Green
    data[canvasIndex + 2] = byteArray[i + 2]; // Blue
    data[canvasIndex + 3] = 255; // Alpha, fully opaque
  }

  // First rendering of image
  context.putImageData(imageData, 0, 0);

  // Rerender
  context.drawImage(
    canvas,
    0,
    0,
    message.width,
    message.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  console.log('Canvas drawn successfully');
}

export default Camera;
