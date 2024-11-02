import { useEffect, useState } from "react";

const Filters = ({ onFilterChange, minPrice, maxPrice }) => {
  const [brands, setBrands] = useState([]);  
  const [selectedBrand, setSelectedBrand] = useState("");  
  const [selectedStar, setSelectedStar] = useState("");
  const [priceRange, setPriceRange] = useState([0,0]);

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
    const fetchBrands = async () => {  
      try {
        const response = await fetch(`http://localhost:3001/stores`); 
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);  
      }
    };

    fetchBrands();
  }, [minPrice, maxPrice]);

  const updateFilters = () => {
    onFilterChange({ priceRange, selectedBrand, selectedStar }); 
  };

  useEffect(updateFilters, [priceRange, selectedBrand, selectedStar]);

  const handleBrandChange = (brand) => setSelectedBrand(brand); 
  const handleStarChange = (star) => setSelectedStar(star);
  const handlePriceChange = (e) => {
    const newRange = [...priceRange];
    newRange[e.target.dataset.index] = Number(e.target.value);
    if (newRange[0] <= newRange[1]) setPriceRange(newRange);
  };

  return (
    <div>
      <h2 className="font-bold text-3xl text-left">Filters</h2>

      <div className="my-4">
        <div className="flex items-center">
          <div className="dropdown dropdown-hover flex-1" aria-label="Brand Filter">
            <div tabIndex={0} role="button" className="btn m-1">
              {selectedBrand || "Select a brand"}
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              {brands.length ? brands.map((brand) => (  
                <li key={brand} onClick={() => handleBrandChange(brand)}> 
                  <a>{brand}</a>
                </li>
              )) : <li>No brands available</li>} 
            </ul>
          </div>
          <button className="btn btn-primary m-1" onClick={() => setSelectedBrand("")}>Clear</button>
        </div>
      </div>

      <div className="my-4">
        <div className="flex items-center">
          <div className="dropdown dropdown-hover flex-1" aria-label="Star Rating Filter">
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
          <button className="btn btn-primary m-1" onClick={() => setSelectedStar("")}>Clear</button>
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
        <button className="btn btn-primary m-1 mt-4" onClick={() => setPriceRange([minPrice, maxPrice])}>Clear Price</button>
      </div>
    </div>
  );
};

export default Filters;
