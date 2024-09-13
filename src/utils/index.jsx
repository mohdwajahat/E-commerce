import axios from "axios";

const productionUrl = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
	baseURL: productionUrl,
});

export const formatPrice = (price) => {
	const formattedPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price/100);
	return formattedPrice;
};

export const generateAmountOptions = (number) => {
	return Array.from({length:number},(_,index) => {
		let amount = index + 1;
		return (
			<option key={amount} value={amount}>{amount}</option>
		)
	})
}