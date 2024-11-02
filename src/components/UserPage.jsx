// import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import AddReview from './AddReview'; 

function UserPage() {
  // const { user } = useAuth0();

  return (
    <div>
      <div className="p-4 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        {/* <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <img src={user.picture} alt="User profile" className="rounded-full mt-4" /> */}
        <h2 className="text-xl font-bold mb-4 mt-6">Add a New Review</h2>
        <AddReview />
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