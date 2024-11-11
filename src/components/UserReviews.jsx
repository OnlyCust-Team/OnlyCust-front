import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function UserReviews({ userReviews = [] }) {
  const [openModalId, setOpenModalId] = useState(null);

  const toggleModal = (reviewId) => {
    setOpenModalId(openModalId === reviewId ? null : reviewId);
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-6">
      <h3 className="text-xl font-bold mb-4 text-gray-300">Your Reviews</h3>
      {userReviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {userReviews.map((review) => (
            <div key={review._id} className="bg-white shadow-md rounded-lg p-4">
              <h4 className="font-bold text-gray-800">{review.product}</h4>
              <p className="text-gray-600 mt-1">{review.review}</p>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
                <span><strong>Store:</strong> {review.store}</span>
                <span><strong>Price:</strong> ${review.price.toFixed(2)}</span>
                <span><strong>Stars:</strong> {'⭐'.repeat(review.stars)}</span>
              </div>
              <button
                onClick={() => toggleModal(review._id)}
                className="mt-2 text-blue-500 hover:underline"
              >
                View Details
              </button>

             
              {openModalId === review._id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full relative">
                    <button
                      onClick={() => toggleModal(review._id)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    >
                      ✕
                    </button>
                    <h4 className="font-bold text-lg text-gray-800 mb-2">{review.product}</h4>
                    <div className="text-sm text-gray-700">
                      <p><strong>Store:</strong> {review.store}</p>
                      <p><strong>Price:</strong> ${review.price.toFixed(2)}</p>
                      <p><strong>Stars:</strong> {'⭐'.repeat(review.stars)}</p>
                    </div>
                    <p className="text-gray-700 mt-4">{review.review}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-4 text-center">
          <img src="https://cdn-icons-png.flaticon.com/512/10845/10845508.png" alt="Add review icon" className="w-16 h-16 mb-2" />
          <p className="text-lg font-semibold text-gray-300">Add your own review! :D</p>
        </div>
      )}
    </div>
  );
}

export default UserReviews;