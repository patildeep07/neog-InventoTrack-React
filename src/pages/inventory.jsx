import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, getAllItems, setLoadingTrue } from "../actions/actions";
import { Card } from "../components/card";

export const Inventory = () => {
  const dispatch = useDispatch();

  const [showAddInventoryForm, setShowAddInventoryForm] = useState(false);

  const [inventoryForm, setInventoryForm] = useState({
    itemName: "",
    quantity: 0,
    price: 0,
    category: "",
    edit: false
  });

  const inventory = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  const submitButtonHandler = () => {
    if (inventoryForm.itemName !== "" && inventoryForm.category !== "") {
      dispatch(addItem(inventoryForm));

      setInventoryForm({
        ...inventoryForm,
        itemName: "",
        quantity: 0,
        price: 0,
        category: "",
        edit: false
      });

      setShowAddInventoryForm(false);
    } else {
      alert("Fill the valid details");
    }
  };

  return (
    <div>
      <h1>Inventory</h1>
      <div className="flex-row">
        {inventory.map((item) => {
          return <Card key={item._id} itemDetails={item} />;
        })}
      </div>

      <button
        className="green-button"
        onClick={() => setShowAddInventoryForm(true)}
      >
        Click here to add a new item
      </button>

      {showAddInventoryForm && (
        <div className="form-outline">
          <h3>ADD A NEW INVENTORY</h3>
          <div className="flex-row">
            <label htmlFor="item-name">Item name:</label>
            <input
              id="item-name"
              value={inventoryForm.itemName}
              onChange={(e) =>
                setInventoryForm({
                  ...inventoryForm,
                  itemName: e.target.value
                })
              }
            />
          </div>

          <div className="flex-row">
            <label htmlFor="quantity">Quantity :</label>
            <input
              id="quantity"
              type="number"
              min={0}
              value={inventoryForm.quantity}
              onChange={(e) =>
                setInventoryForm({
                  ...inventoryForm,
                  quantity: Number(e.target.value)
                })
              }
            />
          </div>

          <div className="flex-row">
            <label htmlFor="price">Price (in Rs) :</label>
            <input
              id="price"
              type="number"
              min={0}
              value={inventoryForm.price}
              onChange={(e) =>
                setInventoryForm({
                  ...inventoryForm,
                  price: Number(e.target.value)
                })
              }
            />
          </div>

          <div className="flex-row">
            <label htmlFor="category">Category :</label>
            <input
              id="category"
              value={inventoryForm.category}
              onChange={(e) =>
                setInventoryForm({
                  ...inventoryForm,
                  category: e.target.value
                })
              }
            />
          </div>

          <div className="flex-row">
            <button
              className="green-button"
              onClick={() => submitButtonHandler()}
            >
              Submit
            </button>
            <button
              className="red-button"
              onClick={() => setShowAddInventoryForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
