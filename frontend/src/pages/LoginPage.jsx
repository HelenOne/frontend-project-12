import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthForm from '../components/AuthForm.jsx';
import * as Yup from 'yup';

const LoginPage = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);

  const handleLogin = async (values) => {
    setAuthError(null);
    try {
      const response = await axios.post('/api/v1/login', values);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      if (err.response?.status === 401) {
        setAuthError('Неверные имя пользователя или пароль');
      } else {
        setAuthError('Ошибка сервера. Попробуйте позже.');
      }
    }
  };

  return (
    <AuthForm
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().required('Обязательное поле'),
        password: Yup.string().required('Обязательное поле'),
      })}
      onSubmit={handleLogin}
      title="✨ Вход в чат ✨"
      buttonText="Войти"
      fields={[
        { name: 'username', label: 'Имя пользователя', placeholder: 'Ваше имя' },
        { name: 'password', label: 'Пароль', type: 'password', placeholder: 'Пароль' },
      ]}
      footer={<>
        {authError && <div className="login-error footer">⚠️ {authError} ⚠️</div>}
        <p className="auth-footer">Нет аккаунта? <Link to="/signup">Зарегистрироваться</Link></p>
      </>}
    />
  );
};

export default LoginPage;
