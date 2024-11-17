import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Navbar from "./components/Navbar";
import UserPage from "./views/UserPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./views/Home";
import Product from "./views/Product";
import AllReviews from "./views/AllReviews";
import "./App.css";

function App() {
  const { isLoading, error } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Oops... {error.message}</div>;

  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<Product />} />
        <Route
          path="/profile"
          element={
            <>
              <ProtectedRoute>
                <main className="flex-1 p-4 bg-base-100">
                  <UserPage />
                </main>
              </ProtectedRoute>
            </>
          }
        />
        <Route path="/allreviews" element={<AllReviews />} />
      </Routes>
    </Router>
  );
}

export default App;
