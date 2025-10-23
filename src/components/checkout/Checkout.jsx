import {Step, StepLabel, Stepper} from "@mui/material";
import {useState} from "react";
import {AddressInfo} from "./AddressInfo.jsx";

export const Checkout = () => {
    const steps = ["Address", "Payment Method", "Order Summary", "Payment"];
    const [activeStep, setActiveStep] = useState(0);
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
            <div className={"mt-5"}>
                {activeStep === 0 && <AddressInfo/>}
                {activeStep === 1 && <AddressInfo/>}
                {activeStep === 2 && <AddressInfo/>}
                {activeStep === 3 && <AddressInfo/>}

            </div>
        </div>
    )
}