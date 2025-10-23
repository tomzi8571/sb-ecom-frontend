import {InputField} from "../shared/InputField.jsx";
import {Spinners} from "../shared/Spinners.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {FaAddressCard} from "react-icons/fa";
import {addUpdateUserAddress} from "../../store/actions/index.js";
import toast from "react-hot-toast";

export const AddAddressForm = ({address, setAddress, setOpen}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {btnLoader} = useSelector((state) => state.errors);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        mode: "onTouched"
    });

    const onSaveAddressHandler = async (data) => {
        dispatch(addUpdateUserAddress(
            data,
            toast,
            address?.addressId,
            setOpen))
    };
    return (
        <div className="">
            <form
                onSubmit={handleSubmit(onSaveAddressHandler)}
                className=""
            >
                <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
                    <FaAddressCard className="mr-2 text-2xl"/>
                    Add Address
                </div>
                <div className="flex flex-col gap-4">
                    <InputField
                        label="Building Name"
                        required={true}
                        id="buildingName"
                        type={"text"}
                        register={register}
                        errors={errors}
                        placeholder={"Enter your building name"}
                        message={"*Building name is required"}
                        className={"text-slate-800"}
                    />
                    <InputField
                        label="Street"
                        required={true}
                        id="street"
                        type={"text"}
                        register={register}
                        errors={errors}
                        placeholder={"Enter your street"}
                        message={"*Street is required"}
                        className={"text-slate-800"}
                    />
                    <InputField
                        label="City"
                        required={true}
                        id="city"
                        type={"text"}
                        register={register}
                        errors={errors}
                        placeholder={"Enter your city"}
                        message={"*City is required"}
                        className={"text-slate-800"}
                    />
                    <InputField
                        label="State"
                        required={true}
                        id="state"
                        type={"text"}
                        register={register}
                        errors={errors}
                        placeholder={"Enter your state"}
                        message={"*State is required"}
                        className={"text-slate-800"}
                    />
                    <InputField
                        label="Zip code"
                        required={true}
                        id="pincode"
                        type={"text"}
                        register={register}
                        errors={errors}
                        placeholder={"Enter your zip code"}
                        message={"*Zip code is required"}
                        className={"text-slate-800"}
                    />
                    <InputField
                        label="Country"
                        required={true}
                        id="country"
                        type={"text"}
                        register={register}
                        errors={errors}
                        placeholder={"Enter your country"}
                        message={"*Country is required"}
                        className={"text-slate-800"}
                    />
                </div>
                <button
                    disabled={btnLoader}
                    className="text-white bg-blue-600 px-4 py-2 rounded-md mt-4"
                    type="submit"
                > {btnLoader
                    ? (<>
                        <Spinners/>
                        Loading ...
                    </>)
                    : (<div>Save Address</div>)
                }
                </button>

            </form>
        </div>
    )
}