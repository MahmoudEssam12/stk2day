export const priceChange = (e) => {
    if (e.target?.name) {
        setPricesInputs((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
        if (
            e.target.name === "min" &&
            Number(e.target.value) < Number(pricesInputs.max)
        ) {
            console.log("min", e.target.value);
            setPriceRange((prev) => {
                let arr = [...prev];
                arr[0] = Number(e.target.value);
                return arr;
            });
        }
        if (e.target.name === "max") {
            console.log("max  ", Number(e.target.value));

            setPriceRange((prev) => {
                let arr = [...prev];
                arr[1] = Number(e.target.value);
                return arr;
            });
        }
    } else {
        setPriceRange(e.value);
        setPricesInputs((prev) => {
            return {
                min: e.value[0],
                max: e.value[1],
            };
        });
    }
};