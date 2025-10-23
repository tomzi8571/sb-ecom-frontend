import React from 'react'
import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import {LiaTimesSolid} from "react-icons/lia";

export const AddressInfoModal = ({open, setOpen, children}) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <DialogBackdrop className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity"/>

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                {/* The actual dialog panel  */}
                <DialogPanel
                    className="relative w-full max-w-md md:max-w-lg mx-auto transform overflow-hidden bg-white rounded-lg shadow-xl transition-all">
                    <div className="px-6 py-6">
                        {children}
                    </div>
                    <div className="absolute top-0 right-0 p-4">
                        <button onClick={() => setOpen(false)} type={"button"}>
                            <LiaTimesSolid className="text-slate-700" size={25}/>
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
