import { useState } from "react";
import axios from "axios";
import FilterForm from "./components/FilterForm";
import OrdersTable from "./components/OrdersTable";

function App() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async (filters) => {
    try {
      const { dateTimeFrom, dateTimeTo, orderTypes } = filters;

      const fetches = orderTypes.map((orderType) =>
        axios.get("https://easycashier.runasp.net/Api/V1/Orders", {
          params: {
            DateTimeFrom: new Date(dateTimeFrom).toISOString(),
            DateTimeTo: new Date(dateTimeTo).toISOString(),
            OrderType: orderType,
            PageNumber: 1,
            PageSize: 10,
          },
        })
      );

      const responses = await Promise.all(fetches);

      const combinedOrders = responses.flatMap(
        (response) => response.data.data
      );
      setOrders(combinedOrders);
      console.log(combinedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold mt-10 mb-4">Easy Cashier</h1>
      </div>
      <FilterForm onFilter={fetchOrders} />
      <div className="mt-6">
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
}

export default App;
