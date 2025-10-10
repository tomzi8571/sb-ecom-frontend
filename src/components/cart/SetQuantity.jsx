export const SetQuantity = (
    {
        quantity,
        cardCounter,
        handleQtyIncrease,
        handleQtyDecrease
    }) => {
    const buttonStyles = "border-[1.2px] border-slate-800 px-3 py-1 rounded ";
    return (
        <div className="flex gap-8 items-center">
            {cardCounter ? null : <div className="font-semibold">QUANTITY</div>}
            <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm">
                <button
                    disabled={quantity <= 1}
                    onClick={handleQtyDecrease}
                    className={buttonStyles}>
                    -
                </button>
                <div className="text-red-500">{quantity}</div>
                <button
                    onClick={handleQtyIncrease}
                    className={buttonStyles}>
                    +
                </button>

            </div>
        </div>
    )
}