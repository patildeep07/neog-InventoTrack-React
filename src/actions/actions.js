import axios from "axios";

// General util

export const setLoadingTrue = () => async (dispatch) => {
  dispatch({ type: "LOADING_TRUE" });
  console.log("Loading set to true");
};

// Exercises actions

export const getAllItems = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://neog-invento-track.onrender.com/api/items"
    );

    const { items } = response.data;

    dispatch({ type: "GET_INVENTORY_ITEMS", payload: items });
  } catch (error) {
    dispatch({ type: "ERROR_GET_INVENTORY" });
  }
};

export const addItem = (itemData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://neog-invento-track.onrender.com/api/items",
      itemData
    );

    const { newItem } = response.data;

    dispatch({ type: "ADD_INVENTORY_ITEM", payload: newItem });
  } catch (error) {
    dispatch({ type: "ERROR_ADD_INVENTORY" });
  }
};

export const removeItem = (itemId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `https://neog-invento-track.onrender.com/api/items/${itemId}`
    );

    const deletedItem = response.data.item;

    dispatch({
      type: "DELETE_INVENTORY_ITEM",
      payload: deletedItem._id,
    });
  } catch (error) {
    dispatch({ type: "ERROR_DELETE_ITEM" });
  }
};

export const updateItem = (updatedItem) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://neog-invento-track.onrender.com/api/items/${updatedItem._id}`,
      updatedItem
    );

    const receivedItem = response.data.newItem;

    dispatch({
      type: "UPDATE_INVENTORY_ITEM",
      payload: { updatedItem: receivedItem },
    });
  } catch (error) {
    dispatch({ type: "ERROR_UPDATE_ITEM" });
  }
};

// Sales

export const getAllSales = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://neog-invento-track.onrender.com/api/sales"
    );

    const { sales } = response.data;

    dispatch({ type: "GET_SALES_ITEMS", payload: sales });
  } catch (error) {
    dispatch({ type: "ERROR_GET_SALES" });
  }
};

export const removeSales = (saleId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `https://neog-invento-track.onrender.com/api/sales/${saleId}`
    );

    dispatch({ type: "DELETE_SALES_ITEM", payload: response.data.sale._id });
  } catch (error) {
    dispatch({ type: "ERROR_DELETE_SALES" });
  }
};

export const addSales = (sales) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://neog-invento-track.onrender.com/api/sales",
      sales
    );
    console.log({ response });
    dispatch({ type: "ADD_SALES_ITEM", payload: response.data.newSale });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR_ADD_SALES" });
  }
};
