import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../store/slices/chatSlice.js';

const ChannelList = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.chat.channels);
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);

  const handleClick = (id) => {
    dispatch(setCurrentChannelId(id));
  };

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
            onClick={() => handleClick(channel.id)}
          >
            # {channel.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ChannelList;
