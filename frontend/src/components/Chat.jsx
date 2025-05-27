import { useSelector } from 'react-redux';

const Chat = () => {
  const channels = useSelector((state) => state.chat.channels);
  const messages = useSelector((state) => state.chat.messages);
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);

  const currentChannel = channels.find((ch) => ch.id === currentChannelId);
  const currentMessages = messages.filter((m) => m.channelId === currentChannelId);

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
    </section>
  );
};

export default Chat;
