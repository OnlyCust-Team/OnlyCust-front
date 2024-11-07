// import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import AddReview from './AddReview'; 
import { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import AddReview from './AddReview';

function UserPage({ reviews, userId, setRefresh }) {
  // Estado para seleccionar la vista activa
  const [activeView, setActiveView] = useState('profile');
  const [userReviews, setUserReviews] = useState([]);

  // Filtrar reseñas del usuario actual
  useEffect(() => {
    const filteredReviews = reviews.filter(review => review.userId === userId);
    setUserReviews(filteredReviews);
  }, [reviews, userId]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      {/* Botones de navegación centrados */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveView('profile')}
          className={`btn ${activeView === 'profile' ? 'btn-primary' : 'btn-outline'}`}
        >
          User Profile
        </button>
        <button
          onClick={() => setActiveView('addReview')}
          className={`btn ${activeView === 'addReview' ? 'btn-primary' : 'btn-outline'}`}
        >
          Add a New Review
        </button>
      </div>

      {/* Renderizado condicional basado en la vista activa */}
      {activeView === 'profile' ? <UserProfile userReviews={userReviews} /> : <AddReview setRefresh={setRefresh} />}
    </div>
  );
}

UserPage.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    picture: PropTypes.string,
  }),
};

export default UserPage;
