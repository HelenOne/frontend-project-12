import { Formik, Form, Field } from 'formik';

const LoginPage = () => (
  <div>
    <h2>Вход</h2>
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={() => {}}
    >
      <Form>
        <label htmlFor="username">Имя пользователя</label>
        <Field id="username" name="username" />

        <label htmlFor="password">Пароль</label>
        <Field id="password" name="password" type="password" />

        <button type="submit">Войти</button>
      </Form>
    </Formik>
  </div>
);

export default LoginPage;
