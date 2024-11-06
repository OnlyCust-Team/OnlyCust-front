import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = () => {
    loginWithRedirect({
      appState: { targetUrl: window.location.pathname },
    });
  };

  return (
    <div className="flex justify-between items-center p-4 bg-base-100">
      <div className="flex items-center">
        <button
          className="btn btn-ghost text-xl"
          onClick={() => navigate("/profile")}
        >
          Mi Perfil
        </button>
      </div>
      <div className="flex items-center justify-center flex-grow">
        <h1
          className="text-5xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Only Cust
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <button
            className="btn btn-ghost text-xl"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Logout
          </button>
        ) : (
          <button className="btn btn-ghost text-xl" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
