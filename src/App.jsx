import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import ReviewList from "./components/ReviewList";
import UserPage from "./components/UserPage";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';

function App() {
  const { isLoading, error } = useAuth0();
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const getReviews = async () => {
    try {
      const res = await fetch(`http://localhost:3001/review`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      const prices = data.map(review => review.price);
      setMaxPrice(Math.max(...prices));
      setMinPrice(Math.min(...prices));
      setReviews(data);
      setFilteredReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleFilterChange = (filterValues) => {
    const { priceRange, selectedStore, selectedStar } = filterValues;

    const newFilteredReviews = reviews.filter(review => {
      const matchesPrice = review.price >= priceRange[0] && review.price <= priceRange[1];
      const matchesStore = !selectedStore || review.store.toLowerCase().includes(selectedStore.toLowerCase());
      const matchesStars = !selectedStar || review.stars >= selectedStar;

      return matchesPrice && matchesStore && matchesStars;
    });
    if (JSON.stringify(filteredReviews) !== JSON.stringify(newFilteredReviews)) {
      setFilteredReviews(newFilteredReviews);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Oops... {error.message}</div>;

  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={
          <>

            <div className="flex">
              <aside className="w-1/4 p-4 bg-base-200">
                <Filters
                  onFilterChange={handleFilterChange}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                />
              </aside>
              <main className="flex-1 p-4 bg-base-100">
                <ReviewList reviews={filteredReviews} />
              </main>
            </div>
          </>
        } />
      </Routes>
      <Routes>
        <Route path="/profile" element={
          <>
            <ProtectedRoute>
              <main className="flex-1 p-4 bg-base-100">
                <UserPage />
              </main>
            </ProtectedRoute>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;