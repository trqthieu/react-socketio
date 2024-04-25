import './App.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://14.225.255.245:8081');

function App() {
  const [room, setRoom] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  function sendMessage() {
    console.log('Join room', room);
    socket.emit('joinRoom', {
      roomId: room,
    });
  }
  function leaveRoom() {
    console.log('Leave room', room);
    socket.emit('leaveRoom', {
      roomId: room,
    });
  }
  useEffect(() => {
    socket.on('message', (data) => {
      console.log('data', data);
      setMessageReceived(JSON.stringify(data));
    });
    socket.on('notification_661612db1ac638ff510f1980', (data) => {
      console.log('notification', data);
      setNotificationMessage(JSON.stringify(data));
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="Message"
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Join room</button>
      <button onClick={leaveRoom}>Leave room</button>
      <h4>Message: {messageReceived}</h4>
      <h4>Notification: {notificationMessage}</h4>
    </div>
  );
}

export default App;
