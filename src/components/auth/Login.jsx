import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {AiOutlineLogin} from "react-icons/ai";
import {InputField} from "../shared/InputField.jsx";

export const Login = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: "onTouched"
    });

    const loginHandler = async (data) => {
        console.log("Login Click", data)
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form
                onSubmit={handleSubmit(loginHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
            >
                <div className="flex flex-col items-center justify-center space-y-4">
                    <AiOutlineLogin className="text-slate-800 text-5xl"/>
                    <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">Login
                        Here</h1>
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
                        label="Password"
                        required={true}
                        id="password"
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
                    : (<>Login</>)
                }
                </button>
                <p className="text-center text-sm text-slate-700 mt-6">
                    Don't have an account?
                    <Link
                        className="font-semibold underline hover:text-black ml-1"
                        to={"/register"}>
                        <span>Sign Up</span>
                    </Link>

                </p>
            </form>
        </div>
    )
}