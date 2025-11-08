import {formatCalculatedPrice, formatPrice} from "../../utils/formatPrice.js";

export const OrderSummary = ({totalPrice, cart, address, paymenMethod}) => {
    return (
        <div className="container mx-auto px-4 mb-8">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 pr-4">
                    <div className="space-y-4">
                        <div className="p-4 border rounded-lg shadow-sm">
                            <h2 className="text-2xl font-semibold mb-2">Billing Address</h2>
                            <p>
                                <strong>Building Name: </strong>
                                {address?.buildingName}
                            </p>
                            <p>
                                <strong>City: </strong>
                                {address?.city}
                            </p>
                            <p>
                                <strong>Street: </strong>
                                {address?.street}
                            </p>
                            <p>
                                <strong>State: </strong>
                                {address?.state}
                            </p>
                            <p>
                                <strong>Pincode: </strong>
                                {address?.pincode}
                            </p>
                            <p>
                                <strong>Country: </strong>
                                {address?.country}
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm">
                            <h2 className="text-2xl font-semibold mb-2">
                                Payment Method
                            </h2>
                            <p>
                                <strong>Method: </strong>
                                {paymenMethod}
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm">
                            <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
                            <div className="space-y-2">
                                {cart?.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <div className="flex items-start">
                                            <img
                                                src={`${import.meta.env.VITE_BACK_END_URL}/images/${item?.image}`}
                                                alt={item?.product?.name}
                                                className="w-24 h-24 rounded"
                                            />
                                            <div className="ml-4">
                                                <strong className="text-slate-900 font-semibold text-xl">{item?.productName}</strong>
                                                <p className="text-slate-500 text-lg">
                                                    {item?.quantity} x {formatPrice(item?.specialPrice)} =
                                                    {formatCalculatedPrice(item?.specialPrice, item?.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-4/12 mt-4 lg:mt-0 pr-4">
                    <div className="p-4 border rounded-lg shadow-sm space-y-4">
                        <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Products</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (0%)</span>
                                <span>{formatPrice(0)}</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                                <span>SubTotal</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}