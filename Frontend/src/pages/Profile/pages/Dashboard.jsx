import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation

const Dashboard = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* Widget 1: Total Revenue */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
          <p className="text-gray-600">$10,000</p>
        </div>

        {/* Widget 2: Total Orders */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-gray-600">100</p>
        </div>

        {/* Widget 3: Recent Orders */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
          <ul>
            <li>
              <Link to="/orders/1">Order #1</Link>
            </li>
            <li>
              <Link to="/orders/2">Order #2</Link>
            </li>
            {/* Add more recent orders */}
          </ul>
        </div>

        {/* Widget 4: Top Products */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Top Products</h2>
          <ul>
            <li>
              <Link to="/products/1">Product #1</Link>
            </li>
            <li>
              <Link to="/products/2">Product #2</Link>
            </li>
            {/* Add more top products */}
          </ul>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-64 mt-2"></div>
    </DefaultLayout>
  );
};

export default Dashboard;
