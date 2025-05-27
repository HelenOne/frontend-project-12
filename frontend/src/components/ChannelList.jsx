import { useSelector } from 'react-redux';

const ChannelList = () => {
  const channels = useSelector((state) => state.chat.channels);
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);

  return (
    <aside className="channels-panel">
      <h3 className="panel-title">Каналы ✨</h3>
      <ul className="channel-list">
        {channels.map((channel) => (
          <li
            key={channel.id}
            className={
              channel.id === currentChannelId
                ? 'channel active-channel'
                : 'channel'
            }
          >
            # {channel.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ChannelList;
