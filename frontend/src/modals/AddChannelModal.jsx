import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannelId } from '../store/slices/chatSlice.js';
import Modal from './Modal.jsx';

const AddChannelModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const channels = useSelector((state) => state.chat.channels);
  const existingNames = useMemo(
    () => channels.map((c) => c.name),
    [channels],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
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
        const res = await axios.post(
          '/api/v1/channels',
          { name: values.name.trim() },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        dispatch(setCurrentChannelId(res.data.id));
        onClose();
      } catch (err) {
        console.error('Ошибка при создании канала', err);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Modal title="Добавить канал" onClose={onClose}>
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
        {formik.touched.name && formik.errors.name ? (
          <div className="input-error">{formik.errors.name}</div>
        ) : null}

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
            Добавить
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddChannelModal;
