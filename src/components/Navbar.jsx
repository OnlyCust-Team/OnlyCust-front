import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    const navigate = useNavigate();

    const handleLogin = () => {
        loginWithRedirect({
            appState: { targetUrl: window.location.pathname }
        });
    };

    return (
        <div className="flex place-content-evenly">
            <div className="navbar bg-base-100 place-content-evenly">
                <button 
                    className="btn btn-ghost text-xl mx-5" 
                    onClick={() => navigate('')}
                >
                    Reviews
                </button>
                <button 
                    className="btn btn-ghost text-xl mx-5" 
                    onClick={() => navigate('/profile')}
                >
                    Mi perfil
                </button>
            </div>
            <div className="navbar bg-base-100">
                <h1 className="text-5xl font-bold">Only Cust</h1>
            </div>
            <div className="flex-none flex items-center gap-4">
                {isAuthenticated ? (
                    <>
                        <span className="text-sm font-semibold">Hello, {user.name}</span>
                        <button
                            className="btn btn-ghost text-xl mx-5"
                            onClick={() => logout({ returnTo: window.location.origin })}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        className="btn btn-ghost text-xl mx-5"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
