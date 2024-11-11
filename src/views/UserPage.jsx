import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import UserReviews from '../components/UserReviews';


function UserPage({ userId }) {
  const { user } = useAuth0();
  const [activeView, setActiveView] = useState('profile');
  const [userReviews, setUserReviews] = useState([]);

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  useEffect(() => {
    const apiCall = async () => {
      try {
        const response = await fetch("http://localhost:3001/review");
        const data = await response.json();

        const productsWithSlug = data.map((product) => ({
          ...product,
          slug: createSlug(product.name),
        }));

        const filteredReviews = productsWithSlug.filter(review => review.username === user.email);
        setUserReviews(filteredReviews);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    apiCall();
  }, []);

  return (
    <div className="p-4 max-w-screen-lg mx-auto flex">
      {/* Sección de perfil de usuario - ocupa 1/4 del ancho con borde */}
      <div className="w-1/4 pr-4 border border-gray-700 rounded-lg">
        <Profile userReviews={userReviews} />
      </div>

      {/* Sección de agregar reseña - ocupa el espacio restante */}
      <div className="w-3/4 pl-4">
        <UserReviews userReviews={userReviews}/>
      </div>
    </div>
  );
}

export default UserPage;