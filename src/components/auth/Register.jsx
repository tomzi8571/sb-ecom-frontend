import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {InputField} from "../shared/InputField.jsx";
import {useDispatch} from "react-redux";
import {registerUser} from "../../store/actions/index.js";
import toast from "react-hot-toast";
import {FaUserPlus} from "react-icons/fa6";

export const Register = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        mode: "onTouched"
    });

    const registerHandler = async (data) => {
        console.log("Register clicked", data)
        dispatch(registerUser(data, toast, reset, navigate, setLoader))
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form
                onSubmit={handleSubmit(registerHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
            >
                <div className="flex flex-col items-center justify-center space-y-4">
                    <FaUserPlus className="text-slate-800 text-5xl"/>
                    <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                        Register Here
                    </h1>
                </div>
                <hr className="mt-2 mb-5 text-black"/>
                <div className="flex flex-col gap-3">
                    <InputField
                        label="Your User Name"
                        required={true}
                        id="username"
                        type={"text"}
                        register={register}
                        errors={errors}
                        placeholder={"Enter your username"}
                        message={"*Username is required"}
                        className={"text-slate-800"}
                    />
                    <InputField
                        label="Email"
                        required={true}
                        id="email"
                        type={"email"}
                        register={register}
                        errors={errors}
                        placeholder={"Enter your email address"}
                        message={"*Email is required"}
                        className={"text-slate-800"}
                    />
                    <InputField
                        label="Password"
                        required={true}
                        id="password"
                        min={6}
                        type={"password"}
                        register={register}
                        errors={errors}
                        placeholder={"Enter your password"}
                        message={"*Password is required"}
                        className={"text-slate-800"}
                    />
                </div>
                <button
                    disabled={loader}
                    className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
                    type="submit"
                > {loader
                    ? (<>Loading ... </>)
                    : (<>Register</>)
                }
                </button>
                <p className="text-center text-sm text-slate-700 mt-6">
                    Already have an account?
                    <Link
                        className="font-semibold underline hover:text-black ml-1"
                        to={"/login"}>
                        <span>Login</span>
                    </Link>
                </p>
            </form>
        </div>
    )
}