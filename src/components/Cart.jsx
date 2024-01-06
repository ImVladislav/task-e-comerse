import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE } from "../redux/actions/action";
import { Link } from "react-router-dom";

const Cart = () => {
  const [itemQuantities, setItemQuantities] = useState({});

  const getData = useSelector((state) => state.cartReducer.carts);
  const dispatch = useDispatch();

  const decrementQuantity = (id) => {
    const updatedQuantities = { ...itemQuantities };
    if (updatedQuantities[id] > 1) {
      updatedQuantities[id] -= 1;
      setItemQuantities(updatedQuantities);
    } else {
      removeItem(id);
    }
  };

  const incrementQuantity = (id) => {
    const updatedQuantities = { ...itemQuantities };

    updatedQuantities[id] = (updatedQuantities[id] || 0) + 1;
    setItemQuantities(updatedQuantities);
  };

  const removeItem = (id) => {
    const updatedQuantities = { ...itemQuantities };
    delete updatedQuantities[id];
    setItemQuantities(updatedQuantities);
    dispatch(REMOVE(id));
  };

  return (
    <>
      {getData.length === 0 ? (
        <p>You have not selected anything yet</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th className="me-5 text-center">Image</th>
                <th className="me-5 text-center">Item</th>
                <th className="me-5 text-center">Quantity</th>
                <th className="me-5 text-center">Price</th>
              </tr>
            </thead>
            <tbody>
              {getData.map((item, index) => (
                <tr className="ms-2" key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      style={{
                        width: "5rem",
                        height: "5rem",
                        margin: "15px 15px",
                      }}
                      alt=""
                    />
                  </td>
                  <td>
                    <div className="text-center mt-3 me-3">
                      <p className="text-center mb-0 fw-bolder">
                        {item.category}
                      </p>
                      <p className="mb-0">Rating: {item.rating.rate}&#x2605;</p>
                      <p className="mb-0">{item.title.substring(0, 45)}</p>
                      <p className="mt-1" onClick={() => removeItem(item.id)}>
                        <i
                          className="fa fa-trash fs-4 delete-icon"
                          aria-hidden="true"
                        ></i>
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="text-center">
                      <button onClick={() => decrementQuantity(item.id)}>
                        -
                      </button>
                      <span>{itemQuantities[item.id] || 1}</span>
                      <button onClick={() => incrementQuantity(item.id)}>
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="text-center">
                      $
                      {(
                        (item.price || 0) * (itemQuantities[item.id] || 1)
                      ).toFixed(2)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
