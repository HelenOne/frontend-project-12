import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from './Modal.jsx';

const RenameChannelModal = ({ channel, onClose }) => {
  const inputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const existingNames = useSelector((state) =>
    state.chat.channels
      .filter((c) => c.id !== channel.id)
      .map((c) => c.name)
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .notOneOf(existingNames, 'Канал с таким именем уже существует')
        .required('Обязательное поле'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');

      try {
        await axios.patch(
          `/api/v1/channels/${channel.id}`,
          { name: values.name.trim() },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onClose();
      } catch (err) {
        console.error('Ошибка при переименовании канала', err);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Modal title="Переименовать канал" onClose={onClose}>
      <form onSubmit={formik.handleSubmit} className="modal-form">
        <input
          id="name"
          name="name"
          type="text"
          className="modal-input"
          ref={inputRef}
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
            Переименовать
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RenameChannelModal;
