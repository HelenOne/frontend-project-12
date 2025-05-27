import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);

  return (
    <div className="login-wrapper">
      <div className="login-form-box">
        <h2 className="login-title">✨ Вход в чат ✨</h2>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={async (values) => {
            setAuthError(null);
            try {
              const response = await axios.post('/api/v1/login', values);
              const token = response.data.token;
              localStorage.setItem('token', token);
              navigate('/');
            } catch (err) {
              if (err.response?.status === 401) {
                setAuthError('Неверные имя пользователя или пароль');
              } else {
                setAuthError('Ошибка сервера. Попробуйте позже.');
              }
            }
          }}
        >
          <Form className="login-form">
            <label className="login-label" htmlFor="username">Имя пользователя</label>
            <Field className="login-input" id="username" name="username" placeholder="Ваше имя" />

            <label className="login-label" htmlFor="password">Пароль</label>
            <Field className="login-input" id="password" name="password" type="password" placeholder="Пароль" />

            {authError && <div className="login-error">⚠️ {authError} ⚠️</div>}

            <button type="submit" className="login-button">Войти</button>
          </Form>
        </Formik>
      </div>
    </div>
  );  
}

export default LoginPage;
