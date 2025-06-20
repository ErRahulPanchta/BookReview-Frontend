import { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSelector(state => state.user);

  useEffect(() => {
    Axios.get('/api/books').then(res => {
      const featuredBooks = res.data.books.slice(0, 3);
      setBooks(featuredBooks);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl mb-4">
          Discover Your Next Favorite Book
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore our curated collection of featured books and find your next great read.
        </p>
      </div>

      {/* Featured Books Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Featured Books
          </h2>
          <Link 
            to="/books" 
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            View All Books →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map(book => (
              <BookCard 
                key={book._id} 
                book={book} 
                className="transform hover:-translate-y-1 transition-transform duration-300"
              />
            ))}
          </div>
        )}
      </section>

      {/* Additional Sections */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Reading Community
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Share your thoughts, discover new perspectives, and connect with fellow book lovers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!userInfo && (
              <Link
                to="/register"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
              >
                Sign Up Now
              </Link>
            )}
            <Link
              to="/books"
              className="px-6 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              Browse Books
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;