import { useState } from 'react';
import { useSelector } from 'react-redux';
import ChannelItem from './ChannelItem.jsx';
import ChannelNameModal from '../modals/ChannelNameModal.jsx';
import ConfirmModal from '../modals/ConfirmModal.jsx';

const ChannelList = () => {
  const channels = useSelector((state) => state.chat.channels);
  const [modalType, setModalType] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const openModal = (type, channel = null) => {
    setSelectedChannel(channel);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedChannel(null);
  };

  return (
    <aside className="channels-panel">
      <div className="panel-header">
        <h3 className="panel-title">Каналы ✨</h3>
        <button
          className="add-channel-button"
          onClick={() => openModal('add')}
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
            onRename={() => openModal('edit', channel)}
            onRemove={() => openModal('remove', channel)}
          />
        ))}
      </ul>

      {modalType === 'add' && (
        <ChannelNameModal mode="add" onClose={closeModal} />
      )}
      {modalType === 'edit' && selectedChannel && (
        <ChannelNameModal
          mode="edit"
          channel={selectedChannel}
          onClose={closeModal}
        />
      )}
      {modalType === 'remove' && selectedChannel && (
        <ConfirmModal
          title="Удалить канал"
          message={`Вы уверены, что хотите удалить канал «${selectedChannel.name}»?`}
          channelId={selectedChannel.id}
          onClose={closeModal}
        />
      )}
    </aside>
  );
};

export default ChannelList;
