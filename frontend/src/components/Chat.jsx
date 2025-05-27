import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const channels = useSelector((state) => state.chat.channels);
  const messages = useSelector((state) => state.chat.messages);
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  const currentChannel = channels.find((ch) => ch.id === currentChannelId);
  const currentMessages = messages.filter((m) => m.channelId === currentChannelId);

  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username') || 'unknown';

    try {
      setIsSending(true);

      await axios.post('/api/v1/messages', {
        body: messageText,
        channelId: currentChannelId,
        username,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessageText('');
    } catch (err) {
      console.error('Ошибка отправки сообщения', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="chat-panel">
      <h3 className="chat-title">#{currentChannel?.name || '...'}</h3>

      <ul className="message-list">
        {currentMessages.map((msg) => (
          <li key={msg.id} className="message">
            <span className="message-user">{msg.username}:</span> {msg.body}
          </li>
        ))}
      </ul>

      <form className="message-form" onSubmit={handleSend}>
        <input
          className="message-input"
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Введите сообщение..."
        />
        <button className="message-button" type="submit" disabled={isSending}>
          Отправить
        </button>
      </form>
    </section>
  );
};

export default Chat;
