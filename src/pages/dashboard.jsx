import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllItems, getAllSales } from "../actions/actions";

export const Dashboard = () => {
  const dispatch = useDispatch();

  // Inventory report

  const inventory = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  // Sales report

  const sales = useSelector((state) => state.sales);

  useEffect(() => {
    dispatch(getAllSales());
  }, [dispatch]);

  return (
    <div>
      <h1>Reports</h1>

      {/* Inventory report */}

      <h2>Inventory report</h2>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(({ _id, itemName, quantity, price }) => {
            return (
              <tr key={_id}>
                <th>{itemName}</th>
                <th>{quantity}</th>
                <th>{price}</th>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Sales report */}

      <h2>Sales report</h2>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(({ _id, itemSold, quantity, price, date }) => {
            const amount = price * quantity;
            return (
              <tr key={_id}>
                <th>{date?.slice(0, 10)}</th>
                <th>{itemSold}</th>
                <th>{quantity}</th>
                <th>Rs. {price}</th>
                <th>Rs. {amount}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
