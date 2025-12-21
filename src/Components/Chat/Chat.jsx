import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import styles from './Chat.module.scss';
import api from '../../api';

const Chat = ({ dealId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    // Fetch initial messages
    api.get(`/message/${dealId}`).then(response => {
      setMessages(response.data);
    });

    socketRef.current = io('http://localhost:3000'); // Your backend URL
    const room = `deal-${dealId}`;

    socketRef.current.emit('joinRoom', room);

    socketRef.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.emit('leaveRoom', room);
      socketRef.current.disconnect();
    };
  }, [dealId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messagePayload = {
      room: `deal-${dealId}`,
      message: newMessage,
      senderId: currentUser.userId,
      dealId: dealId,
    };

    socketRef.current.emit('sendMessage', messagePayload);
    setNewMessage('');
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageList}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.sender.id === currentUser.userId ? styles.myMessage : styles.otherMessage
            }`}
          >
            <div className={styles.messageContent}>
              <p><strong>{msg.sender.username}</strong></p>
              <p>{msg.text}</p>
              <span className={styles.timestamp}>
                {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className={styles.messageInput}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;