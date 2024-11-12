import { useEffect, useState } from "react";

const Filters = ({ onFilterChange }) => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedGama, setSelectedGama] = useState("");
  const [selectedStar, setSelectedStar] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:3001/brands");
        const data = await response.json();

        const uniqueBrands = data

        setBrands(uniqueBrands);
  
        console.log(uniqueBrands)
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    onFilterChange({ selectedBrand, selectedGama, selectedStar });
  }, [selectedBrand, selectedGama, selectedStar, onFilterChange]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    closeDropdowns();
  };

  const handleGamaChange = (gama) => {
    setSelectedGama(gama);
    closeDropdowns();
  };

  const handleStarChange = (star) => {
    setSelectedStar(star);
    closeDropdowns();
  };

  const resetFilters = () => {
    setSelectedBrand("");
    setSelectedGama("");
    setSelectedStar("");
  };

  const closeDropdowns = () => {
    const dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach((dropdown) => {
      dropdown.style.display = "none";
    });
    setTimeout(() => {
      dropdowns.forEach((dropdown) => {
        dropdown.style.display = "";
      });
    }, 100);
  };

  return (
    <div>
      <h2 className="font-bold text-3xl text-left text-white">Filters</h2>
  
      <div className="my-4">
        <div className="flex items-center">
          <div className="dropdown dropdown-hover flex-1">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 w-full bg-blue-500 text-black"
            >
              {selectedBrand || "Select a brand"}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {brands.map((brand) => (
                <li key={brand} onClick={() => handleBrandChange(brand)}>
                  <a>{brand}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  
      <div className="my-4">
        <div className="flex items-center">
          <div className="dropdown dropdown-hover flex-1">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 w-full bg-blue-500 text-black"
            >
              {selectedGama || "Select a gama"}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {["Baja", "Media", "Alta"].map((gama) => (
                <li key={gama} onClick={() => handleGamaChange(gama)}>
                  <a>{gama}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  
      <div className="my-4">
        <div className="flex items-center">
          <div className="dropdown dropdown-hover flex-1">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 w-full bg-blue-500 text-black"
            >
              {selectedStar
                ? `${selectedStar} Star${selectedStar > 1 ? "s" : ""}`
                : "Select stars"}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <li key={star} onClick={() => handleStarChange(star)}>
                  <a>{`${star} Star${star > 1 ? "s" : ""}`}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  
      <div className="my-4">
        <button className="btn bg-blue-500 text-black w-full" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
}  

export default Filters;
