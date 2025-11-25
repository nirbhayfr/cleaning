import { useAppSelector, useAppDispatch } from "../../store/hooks";
// import { incrementQty, decrementQty } from "../../store/cartSlice";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";


export default function CartPage() {
    const cart = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();


    const itemTotal = cart.reduce((sum, item) => sum + +item.price.split(" ")[1] * item.quantity, 0);
    const tax = 0
    const totalAmount = itemTotal + tax;
    return (
        <div className="p-4">
            <Link to="/" className="flex items-center gap-2 mb-4"><ArrowLeft /></Link>

            <h2 className="text-xl font-bold text-center mb-6">My Cart</h2>
            {/* Cart Items */}

            <div className="flex flex-col gap-4">
                {cart.map((item) => (
                    <div key={item.id} className="bg-gray-100 p-4 rounded-xl">
                        <h3 className="font-semibold mb-2">{item.title}</h3>

                        <div className="flex justify-between items-center">
                            {/* Image */}
                            <img
                                src={item.images[0]}
                                alt={item.title}
                                className="w-20 h-20 rounded-lg object-cover"
                            />

                            {/* Qty Buttons */}
                            <div className="flex items-center gap-2">
                                <button
                                    className="border rounded-md px-2"
                                    // onClick={() => dispatch(decrementQty(item.id))}
                                >
                                    –
                                </button>

                                {/* <span>{item.qty}</span> */}

                                <button
                                    className="border rounded-md px-2"
                                    // onClick={() => dispatch(incrementQty(item.id))}
                                >
                                    +
                                </button>
                            </div>

                            {/* Price */}
                            <p className="font-semibold">₹ {item.price}</p>
                        </div>

                        {/* <p className="text-sm mt-1 text-gray-500">{item.title}</p> */}
                    </div>
                ))}

            </div>


            {/* coupons*/}

            <div className="bg-gray-100 p-4 rounded-xl mt-5 flex justify-between">
                <p className="flex items-center gap-2">
                    <span>🎟️</span>coupens and offers
                </p>
                <p className="text-blue-600">5 offers </p>
            </div>

            {/*payment */}

            <div className="mt-6">
                <h3 className=" font-bold mb-3">Payment Summary</h3>
                <div className="flex justify-between mb-2">
                    <span >Item total</span>
                    <span >₹ {itemTotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Taxes and Fee</span>
                    <span>₹ {tax}</span>
                </div>
                <hr className="my-3" />

                <div className="flex justify-between font-bold text-lg ">
                    <span>Total amount</span>
                    <span>₹ {totalAmount}</span>
                </div>
            </div>

            {/* Cancellation Policy */}
            <div className="mt-5 text-sm text-gray-900">
                <h4 className="font-bold mb-1">Cancellation policy</h4>
                <p> Lorem ipsum has been the industry's standard dummy text ever since
                    the 1500s</p>
                <p className="text-blue-600 mt-1">Read full policy</p>
            </div>

            {/*button */}
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6">Proceed To Pay</button>
        </div>

    )
}