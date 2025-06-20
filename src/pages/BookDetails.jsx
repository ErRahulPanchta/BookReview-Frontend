import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ rating: 0, comment: '' });
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    Axios.get(`/api/books/${id}`)
      .then(res => {
        setBook(res.data);
        setReviews(res.data.reviews || []);
      })
      .catch(err => {
        toast.error(err.response?.data?.message || 'Failed to fetch book');
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.rating || !form.comment) {
      toast.error('Rating and comment are required');
      return;
    }
    try {
      await Axios.post('/api/reviews', {
        ...form,
        bookId: id, 
      }, {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      });
      toast.success('Review submitted');
      setForm({ rating: 0, comment: '' });

      const res = await Axios.get(`/api/books/${id}`); // Re-fetch book with reviews
      setBook(res.data);
      setReviews(res.data.reviews || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error posting review');
    }
  };

  if (!book) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Book Cover and Basic Info */}
        <div className="md:w-1/3 lg:w-1/4">
          <div className="sticky top-8">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${book.coverImage}`}
              alt={book.title}
              className="w-full h-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{book.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">by {book.author}</p>
              {book.rating && (
                <div className="flex items-center mt-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.round(book.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">
                    {book.rating?.toFixed(1)} ({reviews.length} reviews)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Book Description and Reviews */}
        <div className="md:w-2/3 lg:w-3/4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Description</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {book.description || 'No description available.'}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Reviews ({reviews.length})
            </h3>

            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review._id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium">
                          {review.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium text-gray-800 dark:text-white">{review.user.name}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 pl-13">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">No reviews yet. Be the first to review!</p>
            )}

            {userInfo ? (
              <div className="mt-10">
                <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Write a Review</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Rating
                    </label>
                    <select
                      onChange={(e) => setForm({ ...form, rating: e.target.value })}
                      value={form.rating}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="0">Select a rating</option>
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{n} Star{n !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Review
                    </label>
                    <textarea
                      placeholder="Share your thoughts about this book..."
                      rows="4"
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      value={form.comment}
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            ) : (
              <div className="mt-8 text-center py-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">
                  Please <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">login</a> to post a review
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;