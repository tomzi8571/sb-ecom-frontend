import {useState} from "react";
import {truncateText} from "../../utils/truncateText.js";
import {HiOutlineTrash} from "react-icons/hi";
import {SetQuantity} from "./SetQuantity.jsx";
import {useDispatch} from "react-redux";
import {decreaseCartQuantity, increaseCartQuantity, removeFromCart} from "../../store/actions/index.js";
import toast from "react-hot-toast";

export const ItemContent = ({
                                productId,
                                image,
                                productName,
                                description,
                                price,
                                quantity,
                                discount,
                                specialPrice,
                                cartId
                            }) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const dispatch = useDispatch();

    const handleQuantityIncrease = (productId) => {
        dispatch(increaseCartQuantity(productId, toast, currentQuantity, setCurrentQuantity));
    }

    const handleQuantityDecrease = (productId) => {
        dispatch(decreaseCartQuantity(productId, toast, currentQuantity, setCurrentQuantity
        ));
    }

    const removeItemFromCart = (productId) => {
        dispatch(removeFromCart(productId, toast));
    }


    return (<div
            className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4   items-center  border border-slate-200  rounded-md  lg:px-4  py-4 p-2">
            <div className="md:col-span-2 justify-self-start flex  flex-col gap-2 ">
                <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start ">
                    <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
                        {truncateText(productName)}
                    </h3>
                </div>
                <div className="md:w-36 sm:w-24 w-12">
                    <img
                        src={image}
                        alt={productName}
                        className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"
                    />
                </div>
                <div className="flex item-start gap-5 mt-3">
                    <button
                        onClick={() => removeItemFromCart(productId)}
                        className="flex items-center font-semibold space-x-2 px-4 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200">
                        <HiOutlineTrash size={16} className="text-rose-600 mr-1"/>
                        Remove
                    </button>
                </div>
            </div>

            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                {Number(specialPrice)}
            </div>
            <div className="justify-self-center">
                <SetQuantity
                    quantity={currentQuantity}
                    cardCounter={true}
                    handleQtyIncrease={() => handleQuantityIncrease(productId)}
                    handleQtyDecrease={() => handleQuantityDecrease(productId)}/>
            </div>
            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                {Number(currentQuantity * Number(specialPrice)).toFixed(2)}
            </div>
        </div>

    )
}