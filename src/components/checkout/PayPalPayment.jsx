import {Alert, AlertTitle} from "@mui/material";

export const PaypalPayment = () => {
    return (
        <div className="h-96 flex justify-center items-center">
            <Alert severity="warning" variant="filled" style={{maxWidth: "400px"}}>
                <AlertTitle>Paypal Unavailable</AlertTitle>
                Paypal Payment is unavailable. Please use another payment option.
            </Alert>
        </div>
    )
}