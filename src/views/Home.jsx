import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Filters from "./Filters";
import sample from "../sample.json";
import "../App.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getProductSample = () => {
    const data = sample;
    setProducts(data);
    setFilteredProducts(data);
  };

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
    getProductSample();
  }, []);

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

  return (
    <div className="flex">
      <aside className="w-1/4 p-4 bg-base-200">
        <Filters onFilterChange={handleFilterChange} />
      </aside>
      <main className="flex-1 p-4 bg-base-100">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Productos</h2>
          <button
            className="bg-lime-500 text-white px-4 py-2 rounded"
            onClick={() => console.log("Añadir nuevo producto")}
          >
            Nuevo Producto
          </button>
        </div>
        <div className="border p-4 rounded bg-white">
          <ul>
            {filteredProducts.map((product, index) => (
              <li key={index} className="mb-4 p-4 border rounded flex">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-1/4 h-auto mr-4 rounded"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold">
                    <Link to={`/${product.slug}`}>{product.name}</Link>
                  </h2>
                  <div className="mt-2 flex items-center">
                    <p className="mr-2 font-bold text-lg">{product.brand}</p>
                    <button className="bg-blue-200 text-blue-800 px-6 py-0.5 rounded-full">
                      {product.gama}
                    </button>
                  </div>
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
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Home;
