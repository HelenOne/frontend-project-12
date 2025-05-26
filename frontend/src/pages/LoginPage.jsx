import { Formik, Form, Field } from 'formik';

const LoginPage = () => (
  <div className="login-wrapper">
    <div className="login-form-box">
      <h2 className="login-title">✨ Вход в чат ✨</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          console.log('Попытка входа:', values);
        }}
      >
        <Form className="login-form">
          <label className="login-label" htmlFor="username">Имя пользователя</label>
          <Field className="login-input" id="username" name="username" placeholder="Ваше имя" />

          <label className="login-label" htmlFor="password">Пароль</label>
          <Field className="login-input" id="password" name="password" type="password" placeholder="Пароль" />

          <button type="submit" className="login-button">Войти</button>
        </Form>
      </Formik>
    </div>
  </div>
);

export default LoginPage;
