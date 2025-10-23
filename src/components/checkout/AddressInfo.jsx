import Skeleton from "../shared/Skeleton.jsx";
import {FaAddressBook} from "react-icons/fa";
import {useState} from "react";
import {AddressInfoModal} from "./AddressInfoModal.jsx";
import {AddAddressForm} from "./AddAddressForm.jsx";

export const AddressInfo = () => {
    const noAddressExists = true;
    const isLoading = false;

    const [openAddressModel, setOpenAddressModel] = useState(false);
    const [selecteetAddress, setSelecteetAddress] = useState("");

    const addNewAddressHandler = () => {
        setSelecteetAddress("");
        setOpenAddressModel(true);
    };

    return (
        <div className="pt-4">
            {noAddressExists ? (
                    <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center">
                        <FaAddressBook size={50} className="text-gray-500 mb-4"/>
                        <h1 className="mb-2 text-slate-900 text-center font-semibold text-2xl">
                            No Address Added Yet
                        </h1>
                        <p className="mb-6 text-slate-800 text-center">
                            Please add your address to complete the purchase.
                        </p>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all"
                            onClick={addNewAddressHandler}>
                            Add Address
                        </button>
                    </div>
                )
                : (
                    <div className="relative p-6 rounded-lg max-w-md mx-auto">
                        <h1 className="text-slate-800 text-center font-bold text-2xl">
                            Select Address
                        </h1>
                        {isLoading ? (
                            <div className="py-4 px-8">
                                <Skeleton/>
                            </div>
                        ) : (
                            <div className="space-y-4 pt-6">
                                <p>Address List here...</p>
                            </div>
                        )}
                    </div>
                )}
            <AddressInfoModal open={openAddressModel} setOpen={setOpenAddressModel}>
                <AddAddressForm address={selecteetAddress}
                                setAddress={setSelecteetAddress}
                                setOpen={setOpenAddressModel}/>
            </AddressInfoModal>

        </div>
    )
}