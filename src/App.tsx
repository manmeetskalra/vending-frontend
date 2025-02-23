import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home";
import Buy from "./pages/Buy";
import { createContext, useState } from "react";
import { Cart } from "./types";
import { Icon } from "@iconify/react";

export const AppContext = createContext<{
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}>({
  cart: { item: undefined, selectedQty: 0 },
  setCart: () => {}, // Ensures setCart is always defined
});

const App = () => {
  const [cart, setCart] = useState<Cart>({ item: undefined, selectedQty: 0 });

  return (
    <AppContext.Provider value={{ cart, setCart }}>
      <div className='p-4'>
        <nav className='bg-blue-500 text-white p-3 flex justify-between'>
          <Link to='/' className='font-bold'>
            Inventory
          </Link>
          <div className='relative inline-flex'>
            <button className='p-2 rounded-full bg-blue-800'>
              <Icon icon='mdi:cart' width='20' height='20' />
            </button>
            <span className='absolute top-0.5 right-0.5 grid min-h-[24px] min-w-[24px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-600 py-1 px-1 text-xs text-white'>
              {cart.selectedQty}
            </span>
          </div>
        </nav>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/buy' element={<Buy />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
