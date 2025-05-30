import { useState } from 'react';
import { useSelector } from 'react-redux';
import AddChannelModal from '../modals/AddChannelModal.jsx';
import ChannelItem from './ChannelItem.jsx';

const ChannelList = () => {
  const channels = useSelector((state) => state.chat.channels);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleRename = (channel) => {
    console.log('Rename modal for', channel);
  };

  const handleRemove = (channel) => {
    console.log('Remove modal for', channel);
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
          <ChannelItem
            key={channel.id}
            channel={channel}
            onRename={handleRename}
            onRemove={handleRemove}
          />
        ))}
      </ul>

      {isModalOpen && (
        <AddChannelModal onClose={() => setModalOpen(false)} />
      )}
    </aside>
  );
};

export default ChannelList;
