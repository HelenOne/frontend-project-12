import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Modal from './Modal.jsx';

const RemoveChannelModal = ({ channel, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `/api/v1/channels/${channel.id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      onClose();
    } catch (err) {
      console.error('Ошибка при удалении канала', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal title="Удалить канал" onClose={onClose}>
      <p>Вы уверены, что хотите удалить канал «{channel.name}»?</p>
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
          onClick={handleDelete}
          disabled={isSubmitting}
        >
          Удалить
        </button>
      </div>
    </Modal>
  );
};

export default RemoveChannelModal;
