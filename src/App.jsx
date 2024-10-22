import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ProductCard from "./components/ProductCard";
import SummaryCard from "./components/SummaryCard";
import SidePanel from "./components/SidePanel";

const getMax = (data) => {
  data = data.sort((a, b) => -a.rating.count + b.rating.count);
  data = data.sort((a, b) => -a.rating.rate + b.rating.rate);

  return data[0];
};

const getAvg = (data) => {
  const sum = data.reduce((acc, product) => {
    return (acc += product.price);
  }, 0);

  return (sum / data.length).toFixed(2);
};

function App() {
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [search, setSearch] = useState("");
  const [slider, setSlider] = useState(1000);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        let data = await response.json();

        setProducts(data);
        setFilteredProducts(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    getMovies();
  }, []);

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const handleChangeSlider = (event) => {
    setSlider(event.target.value);
  };
  const handleSelectCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmitSearch = () => {
    let temp = [...products];

    if (search) {
      temp = temp.filter((product) => product.title.includes(search));
    }

    if (category) {
      temp = temp.filter((product) => product.category === category);
    }

    temp = temp.filter((product) => product.price <= slider);
    setFilteredProducts(temp);
  };

  return (
    <div className="home">
      <div className="dashboard">
        <SidePanel />
      </div>
      <div className="main">
        <div className="filters">
          <div className="search">
            <div className="filter-content">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearchInput}
              />
            </div>
          </div>
          <div className="filter-content">
            <label>Price: </label>
            <input
              type="range"
              name="volume"
              min="0"
              max="1000"
              onChange={handleChangeSlider}
              value={slider}
            ></input>
            ${slider} or lower
          </div>
          <div className="filter-content">
            <label>Categories: </label>

            <input
              type="radio"
              name="categories"
              value=""
              onChange={handleSelectCategory}
            />
            <label>All</label>

            <input
              type="radio"
              name="categories"
              value="men's clothing"
              onChange={handleSelectCategory}
            />
            <label>Men's clothing</label>

            <input
              type="radio"
              name="categories"
              value="women's clothing"
              onChange={handleSelectCategory}
            />
            <label>Women's clothing</label>

            <input
              type="radio"
              name="categories"
              value="electronics"
              onChange={handleSelectCategory}
            />
            <label>Electronics</label>

            <input
              type="radio"
              name="categories"
              value="jewelery"
              onChange={handleSelectCategory}
            />
            <label>Jewelry</label>
          </div>
          <div className="search_btn">
            <button onClick={handleSubmitSearch}>🔍Search</button>
          </div>
        </div>
        <div className="summary">
          {products && <SummaryCard title={"Number of Products"} value={20} />}
          {products && (
            <SummaryCard
              title={"Highest Rated Product"}
              value={getMax([...products]).title}
              extra={getMax([...products]).rating.rate}
            />
          )}
          {products && (
            <SummaryCard
              title={"Average Product Price"}
              value={getAvg([...products])}
              isMoney={true}
            />
          )}
        </div>
        <ul className="listings">
          {filteredProducts &&
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
              />
            ))}
        </ul>
        {(!products || filteredProducts.length === 0) && (
          <div className="placeholder">
            <h1>No Products...</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
