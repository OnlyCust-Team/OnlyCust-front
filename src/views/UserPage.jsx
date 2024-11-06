import { useAuth0 } from "@auth0/auth0-react";
import AddReview from "./AddReview";

function UserPage() {
  const { user } = useAuth0();

  return (
    <div>
      <div className="p-4 max-w-xl mx-auto">
        {/* <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <img src={user.picture} alt="User profile" className="rounded-full mt-4" /> */}
        <h2 className="text-xl font-bold mb-4 mt-6">Add a New Review</h2>
        <AddReview />
      </div>
    </div>
  );
}

export default UserPage;
