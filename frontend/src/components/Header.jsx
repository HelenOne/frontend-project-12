import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiMessageSquare } from 'react-icons/fi';

const APP_NAME = 'Lenny Chat';

const Header = () => {
  const isAuth = Boolean(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <FiMessageSquare className="header-logo-icon" size={24} />
        <Link to="/" className="header-logo">
          {APP_NAME}
        </Link>
      </div>
      {isAuth && (
        <button
          className="logout-button"
          onClick={handleLogout}
          aria-label="Выйти"
        >
          <FiLogOut size={20} />
        </button>
      )}
    </header>
  );
};

export default Header;
