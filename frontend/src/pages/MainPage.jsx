import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage, setChatData } from '../store/slices/chatSlice.js';
import ChannelList from '../components/ChannelList.jsx';
import Chat from '../components/Chat.jsx';
import socket from '../socket.js';
import fetchChatData from '../api/fetchChatData.js';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetchChatData(token)
      .then((data) => dispatch(setChatData(data)))
      .catch((err) => console.error('Ошибка загрузки чата', err));

    socket.on('newMessage', (message) => {
      console.log('ddd')
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('newMessage');
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
