import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import ReviewList from "./components/ReviewList";
import UserPage from "./views/UserPage";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';

function App() {
  const { isLoading, error } = useAuth0();
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const getReviews = async () => {
    try {
      const res = await fetch(`http://localhost:3001/review`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      const allReviews = data.flatMap(product => {
        if (product.reviews && Array.isArray(product.reviews)) {
          return product.reviews.map(review => ({
            ...review,
            productName: product.name || 'Unknown Name',
            productBrand: product.brand || 'Unknown Brand',
            productPrice: product.price || 0,
            productImage: product.image || '',
          }));
        }
        return [];
      });
  
      if (data.length > 0) {
        const prices = data.map(product => product.price).filter(price => typeof price === 'number');
        setMaxPrice(Math.max(...prices));
        setMinPrice(Math.min(...prices));
      }
  
      setReviews(allReviews);
      setFilteredReviews(allReviews);
      setRefresh(true)
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleFilterChange = (filterValues) => {
    const { priceRange, selectedBrand, selectedStar } = filterValues;

    const newFilteredReviews = reviews.filter(review => {
      const matchesPrice = review.productPrice >= priceRange[0] && review.productPrice <= priceRange[1];
      const matchesBrand = !selectedBrand || review.productBrand.toLowerCase().includes(selectedBrand.toLowerCase());
      const matchesStars = !selectedStar || review.stars >= selectedStar;

      return matchesPrice && matchesBrand && matchesStars;
    });

    if (JSON.stringify(filteredReviews) !== JSON.stringify(newFilteredReviews)) {
      setFilteredReviews(newFilteredReviews);
    }
  };

  useEffect(() => {
    getReviews();
  }, [refresh]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Oops... {error.message}</div>;

  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex">
              <aside className="w-1/4 p-4 bg-base-200">
                <Filters
                  onFilterChange={handleFilterChange}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                />
              </aside>
              <main className="flex-1 p-4 bg-base-100">
                <ReviewList products={filteredReviews} />
              </main>
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <main className="flex-1 p-4 bg-base-100">
                <UserPage reviews={filteredReviews} setRefresh={setRefresh} />
              </main>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router >
  );
}

export default App;