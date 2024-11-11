import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Filters from "./Filters";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  console.log(filteredProducts)

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/review");
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
  const timeAgo = (date) => {
    const now = new Date();
    const reviewDate = new Date(date);
    const diffTime = Math.abs(now - reviewDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `Hace ${diffDays} días`;
  };

  const handleProductClick = (slug) => {
    navigate(`/${slug}`);
  };

  return (
    <div className="flex">
      <aside className="w-1/4 p-4 bg-base-200">
        <Filters onFilterChange={handleFilterChange} />
      </aside>
      <main className="flex-1 p-4 bg-base-100">
        <div className="border p-4 rounded bg-white">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Productos</h2>
            <button
              className="bg-lime-500 text-white px-4 py-2 rounded"
              onClick={() => console.log("Añadir nuevo producto")}
            >
              Nuevo Producto
            </button>
          </div>
          <ul>
            {filteredProducts.map((product, index) => (
              <li
                key={index}
                className="mb-4 p-4 border rounded flex cursor-pointer"
                onClick={() => handleProductClick(product.slug)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-1/4 h-auto mr-4 rounded"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <div className="mt-2 flex justify-evenly">
                    <div className="mt-2 items-center">
                      <div className="mt-2 flex items-center">
                        <p className="mr-2 font-bold text-lg">{product.brand}</p>
                        <button className="bg-blue-200 text-blue-800 px-6 py-0.5 rounded-full">
                          {product.gama}
                        </button>
                      </div>
                      <div className="mt-2 flex items-center">
                        <div className="mt-2 flex items-center">
                          {renderStars(
                            product.reviews.reduce(
                              (acc, review) => acc + review.stars,
                              0
                            ) / product.reviews.length
                          )}
                          <p className="ml-2">({product.reviews.length} reviews)</p>
                        </div>
                      </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-xl">
                      <div className="card-body">
                        <p className="card-title">{<div className="flex justify-between">
                          <div className="text-sm text-gray-500">
                            {timeAgo(product.reviews[0].created_at)}
                          </div>
                        </div>}</p>
                        <section>
                          <p className="line-clamp-2">{product.reviews[0].review}</p>
                          <div className="mt-2 flex items-center">
                            {renderStars(
                              product.reviews.reduce(
                                (acc, review) => acc + review.stars,
                                0
                              ) / product.reviews.length
                            )}
                          </div>
                        </section>
                      </div>
                    </div>
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
