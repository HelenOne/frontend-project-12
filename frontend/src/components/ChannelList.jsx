import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../store/slices/chatSlice.js';
import AddChannelModal from '../modals/AddChannelModal.jsx';

const ChannelList = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.chat.channels);
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClick = (id) => {
    dispatch(setCurrentChannelId(id));
  };

  return (
    <aside className="channels-panel">
      <div className="panel-header">
        <h3 className="panel-title">Каналы ✨</h3>
        <button
          className="add-channel-button"
          onClick={() => setModalOpen(true)}
          aria-label="Добавить канал"
          type="button"
        >
          +
        </button>
      </div>

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

      {isModalOpen && (
        <AddChannelModal onClose={() => setModalOpen(false)} />
      )}
    </aside>
  );
};

export default ChannelList;
