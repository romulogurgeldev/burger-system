import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = (event) => {
  const message = event.data;
  alert(message); // Display the notification to the user
};

socket.onopen = () => {
  console.log('WebSocket connection established');
};

socket.onclose = () => {
  console.log('WebSocket connection closed');
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
