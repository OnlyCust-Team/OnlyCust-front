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

        const uniqueBrands = data;

        setBrands(uniqueBrands);

        console.log(uniqueBrands);
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
    <div className="bg-gray-800 p-4 rounded">
      {" "}
      <h2 className="text-2xl font-bold text-white">Filtros</h2>
      <div className="my-4">
        <div className="flex items-center">
          <div className="dropdown dropdown-hover flex-1">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 w-full bg-blue-500 text-white border-none"
            >
              {selectedBrand || "Marca"}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-gray-800 rounded-box z-[1] w-52 p-2 shadow"
            >
              {brands.map((brand) => (
                <li key={brand} onClick={() => handleBrandChange(brand)}>
                  <a className="text-white">{brand}</a>
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
              className="btn m-1 w-full bg-blue-500 text-white border-none"
            >
              {selectedGama || "Gama"}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-gray-800 rounded-box z-[1] w-52 p-2 shadow"
            >
              {["Baja", "Media", "Alta"].map((gama) => (
                <li key={gama} onClick={() => handleGamaChange(gama)}>
                  <a className="text-white">{gama}</a>
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
              className="btn m-1 w-full bg-blue-500 text-white border-none"
            >
              {selectedStar
                ? `${selectedStar} Star${selectedStar > 1 ? "s" : ""}`
                : "Estrellas"}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-gray-800 rounded-box z-[1] w-52 p-2 shadow"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <li key={star} onClick={() => handleStarChange(star)}>
                  <a className="text-white">{`${star} Estrella${
                    star > 1 ? "s" : ""
                  }`}</a>{" "}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="my-4">
        <button
          className="btn bg-blue-500 text-white w-full border-none"
          onClick={resetFilters}
        >
          {" "}
          Resetear Filtros
        </button>
      </div>
    </div>
  );
};

export default Filters;
