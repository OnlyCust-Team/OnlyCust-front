import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
    const { isAuthenticated, user } = useAuth0();

    return (
        <div className="flex place-content-evenly">
            <div className="navbar bg-base-100 place-content-evenly ">
                <a className="btn btn-ghost text-xl mx-5">Reviews</a>
                <a className="btn btn-ghost text-xl mx-5">Mi perfil</a>
            </div>
            <div className="navbar bg-base-100">
            <h1 className="text-5xl font-bold">Only Cust</h1>
            </div>
            <div className="flex-none flex items-center gap-4">
                {isAuthenticated ? (
                    <>
                        <span className="text-sm font-semibold">Hello, {user.name}</span>
                        <a className="btn btn-ghost text-xl mx-5" href="../pages/api/auth/logout">Logout</a>
                    </>
                ) : (
                    <a className="btn btn-ghost text-xl mx-5" href="../pages/api/auth/login">Login</a>
                )}
            </div>
        </div>
    );
}

export default Navbar;