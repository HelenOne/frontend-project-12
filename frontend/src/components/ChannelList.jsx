import { useState } from 'react';
import { useSelector } from 'react-redux';
import AddChannelModal from '../modals/AddChannelModal.jsx';
import RenameChannelModal from '../modals/RenameChannelModal.jsx';
import RemoveChannelModal from '../modals/RemoveChannelModal.jsx';
import ChannelItem from './ChannelItem.jsx';

const ChannelList = () => {
  const channels = useSelector((state) => state.chat.channels);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isRenameModalOpen, setRenameModalOpen] = useState(false);
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
  const [channelToRename, setChannelToRename] = useState(null);
  const [channelToRemove, setChannelToRemove] = useState(null);

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  const handleRename = (channel) => {
    setChannelToRename(channel);
    setRenameModalOpen(true);
  };

  const handleRemove = (channel) => {
    setChannelToRemove(channel);
    setRemoveModalOpen(true);
  };

  return (
    <aside className="channels-panel">
      <div className="panel-header">
        <h3 className="panel-title">Каналы ✨</h3>
        <button
          className="add-channel-button"
          onClick={handleAdd}
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

      {isAddModalOpen && (
        <AddChannelModal onClose={() => setAddModalOpen(false)} />
      )}

      {isRenameModalOpen && channelToRename && (
        <RenameChannelModal
          channel={channelToRename}
          onClose={() => {
            setRenameModalOpen(false);
            setChannelToRename(null);
          }}
        />
      )}

      {isRemoveModalOpen && channelToRemove && (
        <RemoveChannelModal
          channel={channelToRemove}
          onClose={() => {
            setRemoveModalOpen(false);
            setChannelToRemove(null);
          }}
        />
      )}
    </aside>
  );
};

export default ChannelList;
