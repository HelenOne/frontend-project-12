import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="notfound-wrapper">
    <div className="notfound-box">
      <h1 className="notfound-title">✨ 404 ✨</h1>
      <p className="notfound-text">Страница не найдена</p>
      <Link to="/" className="notfound-button">На главную</Link>
    </div>
  </div>
);

export default NotFoundPage;
