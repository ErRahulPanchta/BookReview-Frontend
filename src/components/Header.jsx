import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold tracking-tight hover:text-blue-100 transition-colors duration-200">
              BookReview
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/books"
              className="font-medium hover:text-blue-100 transition-colors duration-200 px-1 py-2 border-b-2 border-transparent hover:border-blue-300"
            >
              Books
            </Link>

            {userInfo ? (
              <div className="flex items-center space-x-6">
                <span className="text-sm font-medium bg-blue-700 px-3 py-1 rounded-full">
                  Hello, {userInfo.name}
                </span>
                <Link
                  to="/profile"
                  className="font-medium hover:text-blue-100 transition-colors duration-200 px-1 py-2 border-b-2 border-transparent hover:border-blue-300"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium transition-colors duration-200 shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link
                  to="/login"
                  className="font-medium hover:text-blue-100 transition-colors duration-200 px-1 py-2 border-b-2 border-transparent hover:border-blue-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button (hidden on desktop) */}
          <div className="md:hidden flex items-center">
            <button className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;