
import storeConfig from "./storeConfig";

const formatPrice = (price) =>
    new Intl.NumberFormat(storeConfig.locale, {
        style: "currency",
        currency: storeConfig.currency,
    }).format(price);

export default formatPrice;
