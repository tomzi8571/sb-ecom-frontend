export const formatPrice = (price) => {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
        }
    ).format(Number(price).toFixed(2))
}

export const formatCalculatedPrice = (price, quantity) => {
    return formatPrice(Number(price) * Number(quantity))
}