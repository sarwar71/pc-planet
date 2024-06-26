import { Button, Form } from "react-bootstrap";
import { search_icon } from "../../assets/index";
import { useEffect, useState } from "react";
import "./index.css";
import { numberFormat } from "../../constants/appConstant";
import { searchProduct } from "../../api/api";

const SearchProduct = () => {
  const [query, setQuery] = useState("");
  const [foundProducts, setFoundProducts] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setShowResults(e.target.value !== "");
  };

  const handleBlur = () => {
    setTimeout(() => setShowResults(false), 500);
  };

  const handleFocus = () => {
    setTimeout(() => setShowResults(query !== ""), 500);
  };

  useEffect(() => {
    searchProduct(query).then((response) => {
      setFoundProducts(response.data);
    });
  }, [query]);

  return (
    <div>
      <Form className="d-flex search-form bg-light align-items-center">
        <Form.Control
          className="bg-light search-field"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={query}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}
          onFocus={() => handleFocus()}
        />
        <Button className="bg-light search-button">
          <img className="search-icon" src={search_icon} alt="search icon" />
        </Button>
      </Form>
      {showResults && (
        <div className="search-result">
          <ul className="product-list mt-1">
            {foundProducts.length ? (
              <>
                {foundProducts.slice(0, 5).map((product, i) => (
                  <li
                    key={i}
                    className={`product-item d-flex flex-row gap-3 ${
                      i === foundProducts.length - 1 ? "no-border" : ""
                    }`}
                  >
                    <img
                      src={`/images/${product.imgName}`}
                      alt={product.imgName}
                      className="product-image"
                    />
                    <div className="d-flex flex-column gap-1">
                      <span>{product.title}</span>
                      <span className="text-danger">
                        {numberFormat(product.price)}৳
                      </span>
                    </div>
                  </li>
                ))}

                {foundProducts.length > 5 && (
                  <div className="see-all">
                    <span href="/all-results">See all results</span>
                  </div>
                )}
              </>
            ) : (
              <span className="opacity-75 p-3">No Search Results Found</span>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
