import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import UserReviews from './UserReviews';

function UserProfile() {
  const { user, isAuthenticated } = useAuth0();
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserReviews = async () => {
        try {
          const response = await fetch('http://localhost:3001/review');
          const data = await response.json();

          const filteredReviews = data
            .flatMap(product =>
              product.reviews
                .filter(review => review.username === user.email)
            );

          setReviewCount(filteredReviews.length);
        } catch (error) {
          console.error("Error fetching user reviews:", error);
        }
      };

      fetchUserReviews();
    }
  }, [isAuthenticated, user.email]);

  console.log(user.created_at);

  const registrationDate = user?.created_at 
  ? new Date(user.created_at).toLocaleDateString() 
  : "Fecha de registro no disponible";

 

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg border border-silver rounded-md">
      <h2 className="text-center text-lg font-semibold text-gray-700">{user.name}</h2>
      <img src={user.picture} alt="User profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
      <p className="text-lg font-semibold text-gray-700">Miembro desde {registrationDate}</p>

      <h3 className="text-xl font-bold mb-4">Your Reviews ({reviewCount})</h3>
    </div>
  );
}

export default UserProfile;