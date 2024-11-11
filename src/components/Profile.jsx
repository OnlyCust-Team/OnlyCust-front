import { useAuth0 } from '@auth0/auth0-react';
import UserReviews from './UserReviews';

function UserProfile() {
  const { user } = useAuth0();

  console.log(user.email)

  const registrationDate = user && new Date(user.created_at).toLocaleDateString();
  const reviewCount = UserReviews.length;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-center text-lg font-semibold text-gray-700">{user.name}</h2>
      <img src={user.picture} alt="User profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
      <p className="text-lg font-semibold text-gray-700">Miembro desde el {registrationDate}</p>
      <h3 className="text-xl font-bold mb-4">Your Reviews ({reviewCount})</h3>

    </div>
  );
}

export default UserProfile;
