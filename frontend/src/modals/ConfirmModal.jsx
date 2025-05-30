import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeChannel } from '../store/slices/chatSlice.js';
import Modal from './Modal.jsx';

const ConfirmModal = ({ title, message, channelId, onClose }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/v1/channels/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // стейт обновится по сокету removeChannel или можно раскомментить:
      // dispatch(removeChannel(channelId));
      onClose();
    } catch (err) {
      console.error('Ошибка при удалении канала', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal title={title} onClose={onClose}>
      <p className="modal-text">{message}</p>
      <div className="modal-buttons">
        <button
          type="button"
          className="modal-button cancel"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Отмена
        </button>
        <button
          type="button"
          className="modal-button submit"
          onClick={handleConfirm}
          disabled={isSubmitting}
        >
          Удалить
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
