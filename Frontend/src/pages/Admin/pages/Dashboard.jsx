import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  FaCartArrowDown,
  FaCartPlus,
  FaFirstOrder,
  FaMoneyCheck,
  FaStreetView,
  FaTrashAlt,
} from "react-icons/fa";
import { RiArrowUpDoubleLine, RiRefund2Fill } from "react-icons/ri";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const DataArray = [
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 1 has been updated",
      date: "2021-09-09",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 2 has been updated",
      date: "2021-09-09",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 3 has been updated",
      date: "2021-09-09",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 4 has been updated",
      date: "2021-09-09",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 5 has been updated",
      date: "2021-09-09",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 5 has been updated",
      date: "2021-09-09",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 5 has been updated",
      date: "2021-09-09",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 5 has been updated",
      date: "2021-09-09",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 5 has been updated",
      date: "2021-09-09",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 5 has been updated",
      date: "2021-09-09",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 5 has been updated",
      date: "2021-09-09",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 5 has been updated",
      date: "2021-09-09",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 5 has been updated",
      date: "2021-09-09",
    },
  ];

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* Widget 1: Total Revenue */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <FaMoneyCheck className="text-3xl text-green-800" />
          <h2 className="text-md font-semibold mb-2 uppercase text-green-800 ">
            Total Revenue
          </h2>
          <p className="text-green-800 font-bold text-2xl flex">
            <p>LKR.</p>10,000
          </p>
        </div>

        {/* Widget 2: Total Orders */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <FaCartArrowDown className="text-3xl text-yellow-600" />
          <h2 className="text-md font-semibold mb-2 text-yellow-600 uppercase">
            Total Orders
          </h2>
          <p className="text-yellow-600 font-bold text-2xl">100,000</p>
        </div>

        {/* Widget 3: Recent Orders */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <RiRefund2Fill className="text-3xl text-pink-800" />
          <h2 className="text-md text-pink-800 font-semibold uppercase mb-2">
            Refunded
          </h2>
          <p className="text-pink-800 font-bold text-2xl flex">
            <span>KLR.</span>10,000
          </p>
        </div>

        {/* Widget 4: Top Products */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <FaStreetView className="text-3xl text-blue-800" />
          <h2 className="text-md font-semibold uppercase text-blue-800 mb-2">
            Visitors
          </h2>
          <p className="text-blue-800 font-bold text-2xl">45.6K</p>
        </div>
      </div>
      {/* Second Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="bg-white rounded-lg shadow-lg mt-2 col-span-9">
          <div className="px-4 py-4">
            <h2 className="text-xl font-bold mb-2 uppercase">Revenue</h2>
            <div className="flex justify-end space-x-2">
              <p className="text-xl font-semibold uppercase text-green-800">
                Revenue
              </p>
              <h2 className="text-xl font-bold uppercase text-green-600 flex">
                42
                <RiArrowUpDoubleLine className="text-green-600" />
              </h2>
            </div>
            <Line
              data={{
                labels: [
                  "jan",
                  "feb",
                  "mar",
                  "apr",
                  "may",
                  "jun",
                  "jul",
                  "aug",
                  "sep",
                  "oct",
                  "nov",
                  "dec",
                ],
                datasets: [
                  {
                    label: "Total Revenue",
                    data: [12, 19, 3, 5, 2, 3, 20, 3, 5, 2, 3, 20],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                  },
                  {
                    label: "Target Revenue",
                    data: [10, 15, 5, 8, 3, 5, 15, 5, 8, 3, 5, 15],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg col-span-3 mt-2 md:ml-2 -md-2">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2 uppercase">Top Products</h2>
            <div className="rounded-md h-[480px] overflow-y-scroll">
              {DataArray.map((data, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border dark:border-slate-700 rounded-md p-2 mb-1"
                >
                  <div className="flex items-center">
                    <img
                      src={data.imageUrl}
                      alt="img"
                      className="w-12 border rounded-md"
                    />
                    <div className="ml-2">
                      <h1 className="text-sm line-clamp-1">{data.text}</h1>
                      <h1 className="text-xs">{data.date}</h1>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to="/signup">
                      <FaTrashAlt
                        className="text-xl text-red-700 cursor-pointer"
                        onClick={() => deleteProduct(data._id)}
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
