export const ADD = (item) => {
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};
// remove item
export const REMOVE = (id) => {
  return {
    type: "REMOVE_TO_CART",
    payload: id,
  };
};
export const INCREMENT_QUANTITY = (id) => {
  return {
    type: "INCREMENT_QUANTITY",
    payload: id,
  };
};

export const DECREMENT_QUANTITY = (id) => {
  return {
    type: "DECREMENT_QUANTITY",
    payload: id,
  };
};
