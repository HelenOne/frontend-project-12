import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  addMessage,
  setChatData,
  addChannel,
  renameChannel,
  removeChannel,
} from '../store/slices/chatSlice.js';
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
      dispatch(addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
    });

    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id));
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
