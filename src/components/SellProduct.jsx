import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

function SellProduct() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleSell = async () => {
    try {
      for (let item of cart) {
        const productRef = doc(db, "products", item.id);
        const newStock = item.stock - item.quantity;
        const newSold = item.sold + item.quantity;

        await updateDoc(productRef, {
          stock: newStock,
          sold: newSold,
        });
      }
      setCart([]);
      setSuccess("✅ Product(s) sold successfully!");
    } catch (error) {
      console.error("Sell failed:", error);
      setSuccess("❌ Failed to sell product(s).");
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Sell Products</h2>
      {success && <p className="mb-4 text-green-600">{success}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product List */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Available Products</h3>
          {products.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
            >
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-600">
                  ৳{product.price} | Stock: {product.stock}
                </p>
              </div>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => addToCart(product)}
              >
                Add
              </button>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">🧾 Cart</h3>
          {cart.length === 0 && <p>No products added.</p>}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-2 border mb-2 rounded"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm">
                  Quantity: {item.quantity} | ৳{item.price} each
                </p>
              </div>
              <button
                className="text-red-500"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          {cart.length > 0 && (
            <>
              <p className="text-lg mt-4 font-semibold">
                Total: ৳{totalPrice}
              </p>
              <button
                className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600"
                onClick={handleSell}
              >
                Confirm Sell
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellProduct;
