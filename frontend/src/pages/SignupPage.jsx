import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthForm from '../components/AuthForm.jsx';
import * as Yup from 'yup';

const SignupPage = () => {
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState(null);

  const handleSignup = async (values) => {
    setSignupError(null);
    try {
      const { username, password } = values;
      const response = await axios.post('/api/v1/signup', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', username);
      navigate('/');
    } catch (err) {
      if (err.response?.status === 409) {
        setSignupError('Пользователь с таким именем уже существует');
      } else {
        setSignupError('Ошибка сервера. Попробуйте позже.');
      }
    }
  };

  return (
    <AuthForm
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={Yup.object({
        username: Yup.string().min(3, 'От 3 до 20 символов').max(20, 'Максимум 20 символов').required('Обязательное поле'),
        password: Yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
          .required('Подтвердите пароль'),
      })}
      onSubmit={handleSignup}
      title="✨ Регистрация ✨"
      buttonText="Зарегистрироваться"
      fields={[
        { name: 'username', label: 'Имя пользователя', placeholder: 'Придумайте имя' },
        { name: 'password', label: 'Пароль', type: 'password', placeholder: 'Пароль' },
        { name: 'confirmPassword', label: 'Подтверждение пароля', type: 'password', placeholder: 'Повторите пароль' },
      ]}
      footer={<>
        {signupError && <div className="login-error footer">⚠️ {signupError}</div>}
        <p className="auth-footer">Уже есть аккаунт? <Link to="/login">Войти</Link></p>
      </>}
    />
  );
};

export default SignupPage;
