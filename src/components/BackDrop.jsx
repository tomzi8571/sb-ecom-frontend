export const BackDrop = ({data}) => {
    return (
        <div className={`z-20 transition-all duration-200 opacity-50 w-screen h-screen bg-slate-300 fixed 
                         ${data ? "top-16" : "top-0"} left-0`}>

        </div>
    )
}