import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import ReviewList from "./components/ReviewList";
import UserPage from "./components/UserPage";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css'

function App() {
  const { isLoading, error } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Oops... {error.message}</div>;

  return (
    <Router>
      <div>
        <Navbar />
      </div>

      <div className="flex">
        <aside className="w-1/4 p-4 bg-base-200">
          <Filters />
        </aside>
        <main className="flex-1 p-4 bg-base-100">
          <Routes>
            <Route path="/" element={<ReviewList />} />
            <Route
              path="/review"
              element={
                <ProtectedRoute>
                  {/* falta pagina de creacion de reviews*/}
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <UserPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;