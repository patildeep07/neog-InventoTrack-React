const initialState = {
  inventory: [],
  sales: [],
  loading: false,
  error: null
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_TRUE":
      return {
        ...state,
        loading: true
      };

    // Add item in inventory

    case "ADD_INVENTORY_ITEM":
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
        loading: false,
        error: null
      };

    case "ERROR_ADD_INVENTORY":
      return {
        ...state,
        error: "Failed to add items in inventory...",
        loading: false
      };

    // Get inventory

    case "GET_INVENTORY_ITEMS":
      return {
        ...state,
        inventory: action.payload,
        loading: false
      };

    case "ERROR_GET_INVENTORY":
      return {
        ...state,
        error: "Failed to get inventory data...",
        loading: false
      };

    // Update inventory

    case "UPDATE_INVENTORY":
      return {
        ...state,
        inventory: state.inventory.map((item) => {
          if (item._id === action.payload._id) {
            return { ...action.payload };
          } else {
            return item;
          }
        }),
        error: null,
        loading: false
      };

    case "ERROR_UPDATE_INVENTORY":
      return {
        ...state,
        error: "Failed to update the item",
        loading: false
      };

    // Delete inventory

    case "DELETE_INVENTORY_ITEM":
      return {
        ...state,
        inventory: state.inventory.filter((item) => item._id !== action.payload)
      };

    case "ERROR_DELETE_ITEM":
      return {
        ...state,
        error: "Failed to delete item",
        loading: false
      };

    // Update item

    case "UPDATE_INVENTORY_ITEM":
      return {
        ...state,
        inventory: state.inventory.map((item) => {
          if (item._id === action.payload.updatedItem._id) {
            return action.payload.updatedItem;
          } else {
            return item;
          }
        })
      };

    case "ERROR_UPDATE_ITEM":
      return {
        ...state,
        error: "Failed to update item",
        loading: false
      };

    // Get all sales item

    case "GET_SALES_ITEMS":
      return {
        ...state,
        sales: action.payload,
        loading: false
      };

    case "ERROR_GET_SALES":
      return {
        ...state,
        error: "Failed to get sales data...",
        loading: false
      };

    // Delete sales

    case "DELETE_SALES_ITEM":
      return {
        ...state,
        sales: state.sales.filter((item) => item._id !== action.payload),
        loading: false,
        error: null
      };

    case "ERROR_DELETE_SALES":
      return {
        ...state,
        error: "Failed to delete data...",
        loading: false
      };

    // Add sale

    case "ADD_SALES_ITEM":
      return {
        ...state,
        sales: [...state.sales, action.payload],
        loading: false,
        error: null
      };

    case "ERROR_ADD_SALES":
      return {
        ...state,
        error: "Failed to add items in sales...",
        loading: false
      };

    default:
      return state;
  }
};
