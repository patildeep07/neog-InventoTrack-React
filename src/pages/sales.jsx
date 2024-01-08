import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSales, getAllSales, removeSales } from "../actions/actions";

export const Sales = () => {
  const dispatch = useDispatch();

  const sales = useSelector((state) => state.sales);

  // console.log({ sales });

  const [showAddSalesForm, setShowAddSalesForm] = useState(false);

  const [salesForm, setSalesForm] = useState({
    itemSold: "",
    quantity: 0,
    description: "",
    price: 0,
    date: ""
  });

  const [filterDateRange, setFilterDateRange] = useState({
    startDate: "",
    endDate: ""
  });

  const filterSales = sales.filter((sale) => {
    const saleDate = new Date(sale.date);

    if (filterDateRange.startDate !== "" && filterDateRange.endDate !== "") {
      const startDate = new Date(filterDateRange.startDate);

      const endDate = new Date(filterDateRange.endDate);

      return saleDate >= startDate && saleDate <= endDate;
    } else {
      return saleDate;
    }
  });

  useEffect(() => {
    dispatch(getAllSales());
  }, [dispatch]);

  // Remove Sale

  const handleRemoveSale = (saleId) => {
    dispatch(removeSales(saleId));
  };

  // Add a new sale

  const submitButtonHandler = () => {
    const { itemSold, description, date } = salesForm;
    if (itemSold !== "" && description !== "" && date !== "") {
      console.log({ salesForm });
      dispatch(addSales(salesForm));
      setShowAddSalesForm(false);
      setSalesForm({
        itemSold: "",
        quantity: 0,
        description: "",
        price: 0,
        date: ""
      });
    } else {
      alert("Enter all the fields");
    }
  };

  return (
    <div>
      <h1>Sales</h1>

      <div className="sales-date">
        <label>From:</label>
        <input
          onChange={(e) =>
            setFilterDateRange({
              ...filterDateRange,
              startDate: e.target.value
            })
          }
          type="date"
        />

        <label>To:</label>
        <input
          onChange={(e) =>
            setFilterDateRange({
              ...filterDateRange,
              endDate: e.target.value
            })
          }
          type="date"
        />
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterSales.map(
              ({ _id, itemSold, quantity, description, price, date }) => {
                const amount = price * quantity;
                return (
                  <tr key={_id}>
                    <th>{date?.slice(0, 10)}</th>
                    <th>{itemSold}</th>
                    <th>{quantity}</th>
                    <th>Rs. {price}</th>
                    <th>Rs. {amount}</th>
                    <th>
                      <button
                        className="red-button"
                        onClick={() => handleRemoveSale(_id)}
                      >
                        Remove
                      </button>
                    </th>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      <button
        className="green-button margin-10"
        onClick={() => setShowAddSalesForm(true)}
      >
        Click here to add a new sale
      </button>

      {showAddSalesForm && (
        <div className="form-outline">
          <h3>ADD A NEW SALE</h3>
          <div className="flex-row">
            <label htmlFor="item-name">Item sold:</label>
            <input
              id="item-name"
              value={salesForm.itemSold}
              onChange={(e) =>
                setSalesForm({
                  ...salesForm,
                  itemSold: e.target.value
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
              value={salesForm.quantity}
              onChange={(e) =>
                setSalesForm({
                  ...salesForm,
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
              value={salesForm.price}
              onChange={(e) =>
                setSalesForm({
                  ...salesForm,
                  price: Number(e.target.value)
                })
              }
            />
          </div>

          <div className="flex-row">
            <label htmlFor="description">Description :</label>
            <input
              id="description"
              value={salesForm.description}
              onChange={(e) =>
                setSalesForm({
                  ...salesForm,
                  description: e.target.value
                })
              }
            />
          </div>

          <div className="flex-row">
            <label htmlFor="date">Date :</label>
            <input
              id="date"
              type="date"
              value={salesForm.date}
              onChange={(e) =>
                setSalesForm({
                  ...salesForm,
                  date: e.target.value
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
              onClick={() => setShowAddSalesForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
