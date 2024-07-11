import { useState, useEffect } from "react";

const FilterForm = ({ onFilter }) => {
  const [dateTimeFrom, setDateTimeFrom] = useState("");
  const [dateTimeTo, setDateTimeTo] = useState("");
  const [orderTypes, setOrderTypes] = useState({
    Delivery: true,
    TakeAway: false,
    Tables: false,
  });

  useEffect(() => {
    const now = new Date();
    setDateTimeTo(now.toISOString().slice(0, 16));
    now.setDate(now.getDate() - 7);
    setDateTimeFrom(now.toISOString().slice(0, 16));
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();

    const selectedOrderTypes = Object.keys(orderTypes).filter(
      (type) => orderTypes[type]
    );
    onFilter({
      dateTimeFrom,
      dateTimeTo,
      orderTypes: selectedOrderTypes,
    });
  };

  const handleOrderTypeChange = (e) => {
    setOrderTypes({
      ...orderTypes,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <form onSubmit={handleFilter} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          DateTimeFrom
        </label>
        <input
          type="datetime-local"
          value={dateTimeFrom}
          onChange={(e) => setDateTimeFrom(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          DateTimeTo
        </label>
        <input
          type="datetime-local"
          value={dateTimeTo}
          onChange={(e) => setDateTimeTo(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <span className="block text-sm font-medium text-gray-700">
          Order Type
        </span>
        <div className="mt-2 space-y-2">
          {["Delivery", "TakeAway", "Tables"].map((type) => (
            <label key={type} className="inline-flex items-center">
              <input
                type="checkbox"
                name={type}
                checked={orderTypes[type]}
                onChange={handleOrderTypeChange}
                className="form-checkbox"
              />
              <span className="ml-2">{type}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-56 py-2 bg-blue-600 text-white rounded-md text-lg"
        >
          Orders
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
