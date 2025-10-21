export const formatPrice = (price) => {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
        }
    ).format(Number(price).toFixed(2))
}
