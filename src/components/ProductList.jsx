import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Filters from "./Filters";
import { useAuth0 } from "@auth0/auth0-react";


function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DATABASE_URL}/review`);
      const data = await response.json();

      const productsWithSlug = data.map((product) => ({
        ...product,
        slug: createSlug(product.name),
      }));

      setProducts(productsWithSlug);
      setFilteredProducts(productsWithSlug);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  const handleFilterChange = (filterValues) => {
    const { selectedBrand, selectedGama, selectedStar } = filterValues;

    const newFilteredProducts = products.filter((product) => {
      const matchesBrand =
        !selectedBrand ||
        product.brand.toLowerCase().includes(selectedBrand.toLowerCase());
      const matchesGama =
        !selectedGama ||
        product.gama.toLowerCase().includes(selectedGama.toLowerCase());
      const matchesStars =
        !selectedStar ||
        product.reviews.some((review) => review.stars >= selectedStar);

      return matchesBrand && matchesGama && matchesStars;
    });

    if (
      JSON.stringify(filteredProducts) !== JSON.stringify(newFilteredProducts)
    ) {
      setFilteredProducts(newFilteredProducts);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const renderStars = (rating) => {
    const fullStars = Math.round(rating);
    return (
      <div className="text-yellow-500 text-lg">
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <span key={`full-${i}`}>&#9733;</span>
          ))}
        {Array(5 - fullStars)
          .fill()
          .map((_, i) => (
            <span key={`empty-${i}`}>&#9734;</span>
          ))}
      </div>
    );
  };

  const handleProductClick = (slug) => {
    navigate(`/${slug}`);
  };

  const handleAddProductClick = () => {
    if (isAuthenticated) {
      navigate('/allreviews', { state: { action: 'newProduct' } });
    } else {
      alert("Para añadir un nuevo producto, por favor inicia sesión.");
      loginWithRedirect();
    }
  };


  return (
    <div className="flex mt-8">
      <aside className="w-1/4 p-4 bg-black border rounded border-silver mr-4">
        <Filters onFilterChange={handleFilterChange} />
      </aside>
  
      <main className="flex-1 p-0 bg-base-100">
        <div className="border-silver border-2 p-4 rounded bg-black">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Productos</h2>
            <button
              className="bg-blue-500 text-black px-4 py-2 rounded"
              onClick={handleAddProductClick}
            >
              Nuevo Producto
            </button>
          </div>
  
          <ul>
            {filteredProducts.map((product, index) => (
              <li
                key={index}
                className="mb-4 p-4 border rounded flex cursor-pointer bg-gray-200"
                onClick={() => handleProductClick(product.slug)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-1/4 h-auto mr-4 rounded"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                  <div className="mt-2 flex items-center">
                    <p className="mr-2 font-bold text-lg text-gray-700">{product.brand}</p>
                    <button className="bg-blue-200 text-blue-800 px-6 py-0.5 rounded-full">
                      {product.gama}
                    </button>
                  </div>
                  <div className="mt-2 flex items-center text-gray-700">
                    {renderStars(
                      product.reviews.reduce(
                        (acc, review) => acc + review.stars,
                        0
                      ) / product.reviews.length
                    )}
                    <p className="ml-2">({product.reviews.length} reviews)</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
  
}
export default ProductList;
