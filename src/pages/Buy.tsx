import { useState } from "react";
import axios from "axios";

const Buy = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  const handleBuy = async () => {
    try {
      const response = await axios.post(
        "https://api.codescopedigital.com/api/inventory/buy",
        {
          name,
          quantity: Number(quantity),
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error purchasing item.");
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Buy Item</h1>
      <input
        type='text'
        placeholder='Item Name'
        className='border p-2 w-full mb-2'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='number'
        placeholder='Quantity'
        className='border p-2 w-full mb-2'
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button
        onClick={handleBuy}
        className='bg-green-500 text-white p-2 rounded-lg'
      >
        Buy Now
      </button>
      {message && <p className='mt-2 text-blue-600'>{message}</p>}
    </div>
  );
};

export default Buy;
