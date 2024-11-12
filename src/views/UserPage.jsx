import Profile from "../components/Profile";
import UserReviews from "../components/UserReviews";

function UserPage() {
  return (
    <div className="p-4 flex gap-4">
      <aside className="w-1/4 p-4 bg-black border border-silver rounded-md">
        <Profile />
      </aside>
      <main className="flex-1 pt-0 px-0 pb-2 bg-black border border-silver rounded-md">
        <UserReviews />
      </main>
    </div>
  );
}

export default UserPage;
