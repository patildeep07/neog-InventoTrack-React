import { useDispatch } from "react-redux";
import { removeItem, updateItem } from "../actions/actions";
import { useState } from "react";

export const Card = ({ itemDetails }) => {
  const { _id, itemName, quantity, price, category, edit } = itemDetails;

  const dispatch = useDispatch();

  const [updateDetails, setUpdateDetails] = useState({
    _id,
    itemName,
    quantity,
    price,
    category,
    edit: false
  });

  const updateButtonHandler = () => {
    dispatch(
      updateItem({
        ...itemDetails,
        edit: true
      })
    );
  };

  const saveButtonHandler = () => {
    dispatch(updateItem(updateDetails));
  };

  return (
    <div className="card-outline">
      {!edit && (
        <div>
          <h3>Item name : {itemName}</h3>
          <p>Quantity available: {quantity}</p>
          <p>Price: Rs. {price}</p>
          <p>Category: {category}</p>

          <button
            className="red-button"
            onClick={() => dispatch(removeItem(_id))}
          >
            Remove
          </button>
          <button
            className="green-button"
            onClick={() => updateButtonHandler()}
          >
            Update
          </button>
        </div>
      )}

      {edit && (
        <div className="edit-card">
          <div className="flex-row no-gap">
            <h3>Item name : </h3>
            <input
              value={updateDetails.itemName}
              onChange={(e) =>
                setUpdateDetails({
                  ...updateDetails,
                  itemName: e.target.value
                })
              }
            />
          </div>

          <div className="flex-row no-gap">
            <p>Quantity available: </p>
            <input
              type="number"
              value={updateDetails.quantity}
              onChange={(e) =>
                setUpdateDetails({
                  ...updateDetails,
                  quantity: e.target.value
                })
              }
            />
          </div>

          <div className="flex-row no-gap">
            <p>Price: Rs. </p>
            <input
              type="number"
              value={updateDetails.price}
              onChange={(e) =>
                setUpdateDetails({
                  ...updateDetails,
                  price: e.target.value
                })
              }
            />
          </div>

          <div className="flex-row no-gap">
            <p>Category: </p>
            <input
              value={updateDetails.category}
              onChange={(e) =>
                setUpdateDetails({
                  ...updateDetails,
                  category: e.target.value
                })
              }
            />
          </div>

          <div>
            <button
              className="red-button"
              onClick={() => dispatch(removeItem(_id))}
            >
              Remove
            </button>
            <button
              className="green-button"
              onClick={() => saveButtonHandler()}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
