import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannelId } from '../store/slices/chatSlice.js';
import Modal from './Modal.jsx';

const ChannelNameModal = ({ mode, channel, onClose }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const channels = useSelector((s) => s.chat.channels);
  const existingNames = useMemo(
    () =>
      channels
        .filter((c) => (mode === 'edit' ? c.id !== channel.id : true))
        .map((c) => c.name),
    [channels, channel?.id, mode]
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: { name: mode === 'edit' ? channel.name : '' },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .notOneOf(existingNames, 'Канал с таким именем уже существует')
        .required('Обязательное поле'),
    }),
    onSubmit: async ({ name }) => {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');
      const trimmed = name.trim();

      try {
        if (mode === 'edit') {
          await axios.patch(
            `/api/v1/channels/${channel.id}`,
            { name: trimmed },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else {
          const res = await axios.post(
            '/api/v1/channels',
            { name: trimmed },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          dispatch(setCurrentChannelId(res.data.id));
        }
        onClose();
      } catch (err) {
        console.error('Ошибка при сохранении канала', err);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const title = mode === 'edit' ? 'Переименовать канал' : 'Добавить канал';
  const submitText = mode === 'edit' ? 'Переименовать' : 'Добавить';

  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={formik.handleSubmit} className="modal-form">
        <input
          ref={inputRef}
          id="name"
          name="name"
          type="text"
          className="modal-input"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isSubmitting}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="input-error">{formik.errors.name}</div>
        )}
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
            type="submit"
            className="modal-button submit"
            disabled={isSubmitting}
          >
            {submitText}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ChannelNameModal;
