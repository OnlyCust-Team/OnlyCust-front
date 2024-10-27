import { useAuth0 } from "@auth0/auth0-react";

function UserPage() {
  const { user } = useAuth0();

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <img src={user.picture} alt="User profile" className="rounded-full mt-4" />
    </div>
  );
}

export default UserPage;