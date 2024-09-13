import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
	cartItems: [],
	numItemsInCart: 0,
	cartTotal: 0,
	shipping: 500,
	tax: 0,
	orderTotal: 0,
};
const getCartFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
	name: "cart",
	initialState: getCartFromLocalStorage(),
	reducers: {
		addItem: (state, action) => {
			const { product } = action.payload;

			const existingItem = state.cartItems.find(
				(item) => item.cartId === product.cartId
			);
			if (existingItem) {
				existingItem.amount += product.amount;
			} else {
				state.cartItems.push(product);
			}

			state.numItemsInCart += product.amount;
			state.cartTotal += product.amount * product.price;
			cartSlice.caseReducers.calculateTotals(state);
			toast.success("Item added to cart");
		},
		clearCart: (state) => {
			state.cartItems = [];
			state.numItemsInCart = 0;
			state.orderTotal = 0;
			state.tax = 0;
			state.cartTotal = 0;
			state.shipping = 0;
			localStorage.setItem("cart", JSON.stringify(defaultState));
		},
		removeItem: (state, action) => {
			const { cartId } = action.payload;
			const removeProduct = state.cartItems.find(
				(item) => item.cartId === cartId
			);
			state.cartItems = state.cartItems.filter(
				(item) => item.cartId !== cartId
			);
			state.numItemsInCart -= removeProduct.amount;
			state.cartTotal -= removeProduct.amount * removeProduct.price;
			cartSlice.caseReducers.calculateTotals(state);
			localStorage.setItem("cart", JSON.stringify(state));
			toast.error("Item removed from cart");
		},
		editItem: (state, action) => {
			const { cartId, amount } = action.payload;
			const product = state.cartItems.find(
				(item) => item.cartId === cartId
			);
			state.numItemsInCart += amount - product.amount;
			state.cartTotal += product.price * (amount - product.amount);
			product.amount = amount;
			cartSlice.caseReducers.calculateTotals(state);
			toast.success("Cart updated");
		},
		calculateTotals: (state) => {
			state.tax = state.cartTotal * 0.1;
			state.orderTotal = state.cartTotal + state.tax + state.shipping;
			localStorage.setItem("cart", JSON.stringify(state));
		},
	},
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
