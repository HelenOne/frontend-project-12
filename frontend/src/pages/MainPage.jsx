import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage, setChatData } from '../store/slices/chatSlice.js';
import axios from 'axios';
import ChannelList from '../components/ChannelList.jsx';
import Chat from '../components/Chat.jsx';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchChatData = async () => {
      const [channelsRes, messagesRes] = await Promise.all([
        axios.get('/api/v1/channels', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('/api/v1/messages', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      dispatch(setChatData({
        channels: channelsRes.data,
        messages: messagesRes.data,
        currentChannelId: channelsRes.data[0]?.id || null,
      }));
    };

    fetchChatData();

    const socket = io();

    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="chat-container">
      <ChannelList />
      <Chat />
    </div>
  );
};

export default MainPage;
