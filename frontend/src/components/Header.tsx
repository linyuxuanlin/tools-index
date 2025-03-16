import { Link } from 'react-router-dom';
import { useState } from 'react';
import { User } from '../types';
import { logout } from '../api/auth';

interface HeaderProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const Header = ({ user, setUser }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            工具导航
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">欢迎，{user.name || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary"
                >
                  退出
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="btn btn-secondary">
                  登录
                </Link>
                <Link to="/register" className="btn btn-primary">
                  注册
                </Link>
              </div>
            )}
          </div>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 border-t">
            {user ? (
              <div className="flex flex-col space-y-2">
                <span className="text-gray-700">欢迎，{user.name || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary w-full"
                >
                  退出
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="btn btn-secondary w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  注册
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 