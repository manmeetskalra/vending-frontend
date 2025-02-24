import { useContext, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { InventoryItem } from "../types";

interface BuyDialogProps {
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  updateInventory: () => void;
}

const BuyDialog: React.FC<BuyDialogProps> = ({
  setInventory,
  updateInventory,
}) => {
  const [bought, setBought] = useState<boolean>();
  const { cart, setCart } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleBuy = async () => {
    if (!cart?.item || (cart.selectedQty && cart.selectedQty <= 0)) {
      setErrorMessage(
        "Invalid purchase: No item selected or quantity is zero."
      );
      return;
    }
    //buy logic here
    //update cart by setCart. This will update the global cart context
    //send api req to decrement the item in DB with the cart.selectedQty
    try {
      const response = await axios.post(
        "http://13.201.21.241/api/inventory/buy",
        {
          name: cart.item?.name,
          quantity: cart.selectedQty,
        }
      );

      setInventory(response.data);
      updateInventory();
      setCart({ item: undefined, selectedQty: 0 });
      setBought(true);
      setTimeout(() => {
        const modal = document.getElementById(
          "my_modal_3"
        ) as HTMLDialogElement | null;
        if (modal) {
          modal.close();
        }
        setBought(false);
      }, 2000);
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(
          "Server Maintainance in progress. Please try again after some time."
        );
      } else if (error.request) {
        setErrorMessage(
          "Network error: Unable to reach the server. Please try again later"
        );
      } else setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <dialog id='my_modal_3' className='modal'>
      <div className='modal-box bg-white'>
        {bought ? (
          <div className='flex flex-col items-center justify-center space-y-4'>
            <img
              src='https://assets-v2.lottiefiles.com/a/a395d3a0-116a-11ee-bc0c-8775d5aa0b0b/0xaOLdqGkm.png'
              alt='Success'
              className='w-24 h-24'
            />
            <h2 className='text-xl font-semibold text-gray-700'>
              Purchase Successful!
            </h2>
            <p className='text-gray-500 text-center px-4'>
              Thanks for the payment. Enjoy your snack!
            </p>
          </div>
        ) : (
          <>
            <p>Checkout</p>
            {errorMessage && (
              <p className='text-red-500'>{errorMessage}</p>
            )}{" "}
            <div className='flex items-center justify-between'>
              <div className='flex'>
                <img className='h-10' src={cart?.item?.display_image_url} />
                <div className='ml-1'>
                  <p>{cart?.item?.name}</p>
                  <p className='text-xs text-gray-400'>₹{cart?.item?.price}</p>
                </div>
              </div>
              <div className='w-[3rem]'>
                <input
                  className='w-full rounded-md p-1 text-center'
                  value={cart?.selectedQty}
                  type='number'
                  onChange={(e) =>
                    setCart((prev) => {
                      return {
                        ...prev,
                        selectedQty: Number(e.target.value),
                      };
                    })
                  }
                />
              </div>
            </div>
            <div className='w-full flex justify-center'>
              <button
                onClick={handleBuy}
                className='bg-green-300 cursor-pointer px-4 py-1 rounded '
              >
                Buy
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default BuyDialog;
