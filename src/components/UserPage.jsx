// import { useAuth0 } from '@auth0/auth0-react';
// import AddReview from './AddReview'; 
// import UserProfile from './UserProfile';

// function UserPage() {
//   const { user } = useAuth0();

//   return (
//     <div>
//       <div className="p-4 max-w-xl mx-auto">
//         {/* <h2 className="text-2xl font-bold mb-4">User Profile</h2> */}
//         {/* <p>Name: {user.name}</p>
//         <p>Email: {user.email}</p>
//         <img src={user.picture} alt="User profile" className="rounded-full mt-4" /> */}
//         <UserProfile />
//         {/* <h2 className="text-xl font-bold mb-4 mt-6">Add a New Review</h2> */}
//         {/* <AddReview /> */}
//       </div>
//     </div>
//   );
// }

// export default UserPage;
import { useState } from 'react';
import UserProfile from './UserProfile';
import AddReview from './AddReview';

function UserPage() {
  // Estado para seleccionar la vista activa
  const [activeView, setActiveView] = useState('profile');

  return (
    <div className="p-4 max-w-xl mx-auto">
      {/* <h2 className="text-2xl font-bold mb-4 text-center">User Page</h2> */}
      
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
      {activeView === 'profile' ? <UserProfile /> : <AddReview />}
    </div>
  );
}

export default UserPage;
