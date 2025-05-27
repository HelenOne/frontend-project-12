import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setChatData } from '../store/slices/chatSlice.js';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChatData = async () => {
      const token = localStorage.getItem('token');

      const response = await axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setChatData(response.data));
    };

    fetchChatData();
  }, [dispatch]);

  return (
    <div>
      <h1>Чат и каналы</h1>
      {/* пока просто заглушка */}
    </div>
  );
};

export default MainPage;
