import { Link } from 'react-router-dom';

const BookCard = ({ book }) => (
  <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
    <div className="relative pb-[125%] overflow-hidden">
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${book.coverImage}`}
        alt={book.title}
        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />

    </div>

    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1 mb-1">
        {book.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-1">
        by {book.author}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {book.rating?.toFixed(1) || "0"} / 5
          </span>
        </div>

        <Link
          to={`/book/${book._id}`}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  </div>
);

export default BookCard;