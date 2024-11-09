// import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import UserReviews from '../components/UserRevies';


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
    <div className="p-4 max-w-screen-lg mx-auto flex">
    {/* Sección de perfil de usuario - ocupa 1/4 del ancho con borde */}
    <div className="w-1/4 pr-4 border border-gray-700 rounded-lg">
      <Profile userReviews={userReviews} />
    </div>

    {/* Sección de agregar reseña - ocupa el espacio restante */}
    <div className="w-3/4 pl-4">
      <UserReviews setRefresh={setRefresh} />
    </div>
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
