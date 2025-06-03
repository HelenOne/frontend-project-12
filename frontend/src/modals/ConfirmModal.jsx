import { useState } from 'react';
import axios from 'axios';
import Modal from './Modal.jsx';

const ConfirmModal = ({ title, message, channelId, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/v1/channels/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
