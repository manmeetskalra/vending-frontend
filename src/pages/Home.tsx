import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { InventoryItem } from "../types";
import BuyDialog from "../components/BuyDialog";
import { AppContext } from "../App";

const Home = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const { cart: _cart, setCart } = useContext(AppContext);
  const [updateInventory, setUpdateInventory] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/inventory")
      .then((response) => setInventory(response.data))
      .catch((error) => console.error("Error fetching inventory:", error));
  }, [updateInventory]);

  const handleAddToCart = (item: InventoryItem) => {
    setCart({
      item,
      selectedQty: 1,
    });
    (document.getElementById("my_modal_3") as HTMLDialogElement).showModal();
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Inventory List</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {Array.isArray(inventory) ? (
          inventory.map((item, index) => (
            <div key={index} className='border p-4 rounded-lg shadow-lg'>
              <img
                src={item.display_image_url}
                alt={item.name}
                className='w-full h-40 object-cover mb-2 rounded-lg'
              />
              <div className='flex justify-between w-full'>
                <div>
                  <h2 className='text-lg font-semibold'>{item.name}</h2>
                  <p className='text-gray-600'>Price: ₹{item.price}</p>
                  <p className='text-gray-600'>
                    Available: {item.available_units}
                  </p>
                </div>
                <div className='flex items-center'>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className='border rounded-md cursor-pointer border-b-gray-500 px-4 py-1 '
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading inventory...</p>
        )}
      </div>
      <BuyDialog
        setInventory={setInventory}
        updateInventory={() => setUpdateInventory((prev) => !prev)}
      />
    </div>
  );
};

export default Home;
