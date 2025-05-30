import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannelId } from '../store/slices/chatSlice.js';

const ChannelItem = ({ channel, onRename, onRemove }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);

  const handleSelect = () => {
    dispatch(setCurrentChannelId(channel.id));
  };

  return (
    <li
      className={
        channel.id === currentChannelId
          ? 'channel active-channel'
          : 'channel'
      }
      onClick={handleSelect}
    >
      <div className="channel-content">
        <span className="channel-name"># {channel.name}</span>

        {channel.removable && (
          <div className="channel-actions">
            <button
              className="icon-button"
              onClick={(e) => {
                e.stopPropagation();
                onRename(channel);
              }}
              aria-label="Переименовать канал"
            >
              <FiEdit2 />
            </button>
            <button
              className="icon-button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(channel);
              }}
              aria-label="Удалить канал"
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default ChannelItem;
