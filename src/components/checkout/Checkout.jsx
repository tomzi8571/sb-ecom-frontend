import {Button, Step, StepLabel, Stepper} from "@mui/material";
import {useEffect, useState} from "react";
import {AddressInfo} from "./AddressInfo.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getUserAddresses} from "../../store/actions/index.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import Skeleton from "../shared/Skeleton.jsx";
import {ErrorPage} from "../shared/ErrorPage.jsx";
import {PaymentMethod} from "./PaymentMethod.jsx";
import {OrderSummary} from "./OrderSummary.jsx";
import {StripePayment} from "./StripePayment.jsx";
import {PaypalPayment} from "./PayPalPayment.jsx";

export const Checkout = () => {
    const steps = ["Address", "Payment Method", "Order Summary", "Payment"];
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {address, selectedUserCheckoutAddress} = useSelector((state) => state.auth);
    const {isLoading, errorMessage} = useSelector((state) => state.errors)
    const {paymentMethod} = useSelector((state) => state.payment)
    const {cart, totalPrice} = useSelector((state) => state.carts)

    useEffect(() => {
        dispatch(getUserAddresses(navigate, toast));
    }, [dispatch])

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleNext = () => {
        if (activeStep === 0 && !selectedUserCheckoutAddress) {
            toast.error("Please select an checkout address");
            return;
        }
        if (activeStep === 1 && !paymentMethod) {
            toast.error("Please select a payment method");
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    return (
        <div
            className={"py-14 min-h-[calc[100vh-100px]]"}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {isLoading
                ? (<div className="lg:w-[80%] mx-auto py-5">
                    <Skeleton/>
                </div>)
                : (<div className={"mt-5"}>
                    {activeStep === 0 && <AddressInfo address={address}/>}
                    {activeStep === 1 && <PaymentMethod/>}
                    {activeStep === 2 && <OrderSummary totalPrice={totalPrice}
                                                       cart={cart}
                                                       address={selectedUserCheckoutAddress}
                                                       paymenMethod={paymentMethod}/>}
                    {activeStep === 3 &&
                    <>
                        {paymentMethod === "Stripe" && (<StripePayment/>)}
                        {paymentMethod === "Paypal" && (<PaypalPayment/>)}
                    </>
                        }
                </div>)}

            <div
                className="flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-200
                shadow-gray-900"
                style={{boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)"}}
            >
                <Button variant="outlined"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className="px-6 h-10 bg-custom-blue text-white font-semibold rounded-md"

                >Back
                </Button>
                {activeStep !== steps.length - 1 &&
                    <button disabled={errorMessage ||
                        (activeStep === 0 ? !selectedUserCheckoutAddress
                            : activeStep === 1 ? !paymentMethod
                                : false)}
                            onClick={handleNext}
                            className={`px-6 h-10 bg-custom-blue text-white font-semibold rounded-md
                            ${errorMessage ||
                            (activeStep === 0 && !selectedUserCheckoutAddress)
                            || (activeStep === 1 && !paymentMethod)
                                ? "opacity-60 cursor-not-allowed"
                                : ""
                            }`}
                    >Proceed
                    </button>
                }
            </div>
            {errorMessage && <ErrorPage message={errorMessage}/>}
        </div>
    )
}