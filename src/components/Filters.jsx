import { useEffect, useState } from "react";

const Filters = ({ onFilterChange, minPrice, maxPrice }) => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedStar, setSelectedStar] = useState("");
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(`http://localhost:3001/stores`);
        const data = await response.json();
        setStores(data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    onFilterChange({ priceRange, selectedStore, selectedStar });
  }, [priceRange, selectedStore, selectedStar, onFilterChange]);

  const handleStoreChange = (store) => {
    setSelectedStore(store);
  };

  const handleStarChange = (star) => {
    setSelectedStar(star);
  };

  const handlePriceChange = (e) => {
    const newPriceRange = [...priceRange];
    newPriceRange[e.target.dataset.index] = Number(e.target.value);
    setPriceRange(newPriceRange);
  };

  const clearStoreFilter = () => {
    setSelectedStore("");
  };

  const clearStarFilter = () => {
    setSelectedStar("");
  };

  const clearPriceFilter = () => {
    setPriceRange([minPrice, maxPrice]);
  };

  return (
    <div>
      <h2 className="font-bold text-3xl text-left">Filters</h2>
      
      <div className="my-4">
        <div className="flex items-center">
          <div className="dropdown dropdown-hover flex-1">
            <div tabIndex={0} role="button" className="btn m-1">
              {selectedStore || "Select a store"}
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              {stores.map((store) => (
                <li key={store} onClick={() => handleStoreChange(store)}>
                  <a>{store}</a>
                </li>
              ))}
            </ul>
          </div>
          <button className="btn btn-primary m-1" onClick={clearStoreFilter}>Clear</button>
        </div>
      </div>
      
      <div className="my-4">
        <div className="flex items-center">
          <div className="dropdown dropdown-hover flex-1">
            <div tabIndex={0} role="button" className="btn m-1">
              {selectedStar ? `${selectedStar} Star${selectedStar > 1 ? 's' : ''}` : "Select stars"}
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              {[1, 2, 3, 4, 5].map((star) => (
                <li key={star} onClick={() => handleStarChange(star)}>
                  <a>{`${star} Star${star > 1 ? 's' : ''}`}</a>
                </li>
              ))}
            </ul>
          </div>
          <button className="btn btn-primary m-1" onClick={clearStarFilter}>Clear</button>
        </div>
      </div>
      <div className="flex flex-col my-4">
        <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          data-index="0"
          value={priceRange[0]}
          onChange={handlePriceChange}
          className="range range-xs"
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          data-index="1"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="range range-xs"
        />
        <button className="btn btn-primary m-1 mt-4" onClick={clearPriceFilter}>Clear Price</button>
      </div>
    </div>
  );
};

export default Filters;
