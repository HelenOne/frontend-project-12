import axios from 'axios';

const fetchChatData = async (token) => {
  const [channelsRes, messagesRes] = await Promise.all([
    axios.get('/api/v1/channels', {
      headers: { Authorization: `Bearer ${token}` },
    }),
    axios.get('/api/v1/messages', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  return {
    channels: channelsRes.data,
    messages: messagesRes.data,
    currentChannelId: channelsRes.data[0]?.id || null,
  };
};

export default fetchChatData;
