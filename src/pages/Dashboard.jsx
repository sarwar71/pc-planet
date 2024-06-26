import React, { useEffect, useState } from "react";
import { getProducts } from "../api/api";
import ProductView from "../components/product/ProductView";
import { STATUS } from "../constants/fetchStatus";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(STATUS.IDLE);

  const fetchProducts = () => {
    setFetchStatus(STATUS.LOADING);
    getProducts()
      .then((response) => {
        setProducts(response.data);
        setDefaultProducts(response.data);
        setFetchStatus(STATUS.SUCCESS);
      })
      .catch(() => {
        setFetchStatus(STATUS.ERROR);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <ProductView
        products={products}
        setProducts={setProducts}
        defaultProducts={defaultProducts}
        status={fetchStatus}
        loadProducts={fetchProducts}
      />
    </>
  );
};

export default Dashboard;
