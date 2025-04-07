import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, item) => sum + item.stock, 0);
  const totalSold = products.reduce((sum, item) => sum + item.sold, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-3xl">{totalProducts}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Total In Stock</h2>
          <p className="text-3xl">{totalStock}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Total Sold</h2>
          <p className="text-3xl">{totalSold}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
