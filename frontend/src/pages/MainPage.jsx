import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setChatData } from '../store/slices/chatSlice.js';
import ChannelList from '../components/ChannelList.jsx';
import Chat from '../components/Chat.jsx';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChatData = async () => {
      const token = localStorage.getItem('token');

      const channelsResponse = await axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const messagesResponse = await axios.get('/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      dispatch(setChatData({
        channels: channelsResponse.data,
        messages: messagesResponse.data,
        currentChannelId: channelsResponse.data[0]?.id || null,
      }));      
    };

    fetchChatData();
  }, [dispatch]);

  return (
    <div className="chat-container">
      <ChannelList />
      <Chat />
    </div>
  );
};

export default MainPage;
