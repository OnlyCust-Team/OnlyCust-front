import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function UserReviews() {
  const { user, isAuthenticated } = useAuth0();
  const [userReviews, setUserReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserReviews = async () => {
        try {
          const response = await fetch("http://localhost:3001/review");
          const data = await response.json();

          const filteredReviews = data.flatMap((product) =>
            product.reviews
              .filter((review) => review.username === user.email)
              .map((review) => ({
                ...review,
                product: product.name,
                price: product.price,
                store: product.store,
              }))
          );

          setUserReviews(filteredReviews);
        } catch (error) {
          console.error("Error fetching user reviews:", error);
        }
      };

      fetchUserReviews();
    }
  }, [isAuthenticated, user.email]);

  const indexOfLastReview = (currentPage + 1) * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = userReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(
        prevPage + 1,
        Math.floor((userReviews.length - 1) / reviewsPerPage)
      )
    );
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div className="p-4 w-full mt-4 relative">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevPage}
          className="bg-blue-400 text-gray-300 w-12 h-12 rounded-full flex items-center justify-center"
          disabled={currentPage === 0}
        >
          ❮
        </button>

        <h3 className="text-xl font-bold text-gray-300">Your Reviews</h3>

        <button
          onClick={nextPage}
          className="bg-blue-400 text-gray-300 w-12 h-12 rounded-full flex items-center justify-center"
          disabled={indexOfLastReview >= userReviews.length}
        >
          ❯
        </button>
      </div>

      {currentReviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {currentReviews.map((review) => (
            <div key={review._id} className="bg-white shadow-md rounded-lg p-4">
              <h4 className="font-bold text-gray-800">{review.product}</h4>
              <p className="text-gray-600 mt-1">{review.review}</p>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
                <span>
                  <strong>Store:</strong> {review.store}
                </span>
                <span>
                  <strong>Price:</strong> ${review.price.toFixed(2)}
                </span>
                <span>
                  <strong>Stars:</strong> {"⭐".repeat(review.stars)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-4 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/10845/10845508.png"
            alt="Add review icon"
            className="w-16 h-16 mb-2"
          />
          <p className="text-lg font-semibold text-gray-300">
            Add your own review! :D
          </p>
        </div>
      )}
    </div>
  );
}

export default UserReviews;
