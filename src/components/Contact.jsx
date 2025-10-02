import {FaEnvelope, FaMapMarkedAlt, FaMapMarkerAlt, FaPhone} from "react-icons/fa"

export const Contact = () => {
    return (
        <div className={"flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center"}
             style={{backgroundImage: "url('https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?cs=srgb&fm=jpg&w=1920&h=1282')"}}>
            <div className={"bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"}>
                <h1 className={"text-4xl font-bold text-center mb-6"}>
                    Contact us
                </h1>
                <p>
                    We would love to hear from you! Please fill out the form below or contact us directly.
                </p>

                <form className={"space-y-4 mt-4"}>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Name
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Enter your name"
                            className={"mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"}
                        />
                    </div>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="Enter your name"
                            className={"mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"}
                        />
                    </div>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Message
                        </label>
                        <textarea
                            rows={4}
                            required
                            placeholder="Enter your name"
                            className={"mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"}
                        />
                    </div>
                    <button
                        className={"w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 transition duration-300"}>
                        Send Message
                    </button>

                </form>
                <div className={"mt-8 text-center"}>
                    <h2 className={"text-lg font-semibold"}>Contact information</h2>
                    <div className={"flex flex-col items-center space-y-2 mt-4"}>
                        <div className={"flex items-center"}>
                            <FaPhone className={"text-blue-500 mr-2"}/>
                            <span className={"text-gray-600"}>+43 688 3729930</span>
                        </div>
                        <div className={"flex items-center"}>
                            <FaEnvelope className={"text-blue-500 mr-2"}/>
                            <span className={"text-gray-600"}>thomas.zillinger@gmail.com</span>
                        </div>
                        <div className={"flex items-center"}>
                            <FaMapMarkerAlt className={"text-blue-500 mr-2"}/>
                            <span className={"text-gray-600"}>8051 Graz</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}