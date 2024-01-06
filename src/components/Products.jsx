import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    const response = await fetch("https://fakestoreapi.com/products");

    const products = await response.json();
    setData(products);
    setFilter(products);
    setLoading(false);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filteredProducts = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilter(filteredProducts);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filter.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const renderCurrentItems = (items) => {
    return items.map((item) => (
      <div className="col-4 mt-5" key={item.id}>
        <Card style={{ height: "100%" }} className="border border-dark ">
          <Card.Img
            variant="top"
            style={{ height: "50%", width: "100%" }}
            src={item.image}
          />
          <Card.Body style={{ display: "inline-grid" }}>
            <Card.Title>{item.title.substring(0, 12)}</Card.Title>
            <Card.Text className="fw-bold">$ {item.price}</Card.Text>
            <Link to={`/products/${item.id}`}>
              <Button variant="dark">Buy Now</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    ));
  };

  const renderPaginationButtons = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filter.length / itemsPerPage); i++) {
      pageNumbers.push(
        <Button key={i} onClick={() => paginate(i)} variant="outline-dark">
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };
  const Loading = () => {
    return (
      <>
        <div className="mt-4 ">
          <Spinner animation="grow" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container mt-5 pb-5">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="display-6 ">All Products</h1>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <hr />
            <div className=" d-flex row justify-content-center">
              {loading ? <Loading /> : renderCurrentItems(currentItems)}
            </div>

            <div className="d-flex justify-content-center mt-3">
              {renderPaginationButtons()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
