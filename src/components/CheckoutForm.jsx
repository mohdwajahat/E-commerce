import { redirect, Form } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import { formatPrice, customFetch } from "../utils";

export const action =
	(store, queryClient) =>
	async ({ request }) => {
		const formData = await request.formData();
		const { name, address } = Object.fromEntries(formData);
		const user = store.getState().userState.user;
		const { cartItems, orderTotal, numItemsInCart } =
			store.getState().cartState;
		const info = {
			name,
			address,
			cartItems,
			chargeTotal: orderTotal,
			numItemsInCart,
			orderTotal: formatPrice(orderTotal),
		};
		try {
			const response = await customFetch.post(
				"/orders",
				{ data: info },
				{ headers: { Authorization: `Bearer ${user.token}` } }
			);
			queryClient.removeQueries(["orders"]);
			store.dispatch(clearCart());
			toast.success("Order Placed Successfully");
			return redirect("/orders");
		} catch (error) {
			console.log(error);
			const errorMessage =
				error?.response?.data?.error?.message ||
				"there was an error placing your order";
			toast.error(errorMessage);
			if (error?.response?.status === 401 || 403)
				return redirect("/login");
			return null;
		}
	};
const CheckoutForm = () => {
	return (
		<Form method="POST" className="flex flex-col gap-y-4">
			<h4 className="font-medium text-xl">Shipping Information</h4>
			<FormInput label="first name" name="name" type="text" />
			<FormInput label="address" name="address" type="text" />
			<div className="mt-4">
				<SubmitBtn text="PLACE YOUR ORDER" />
			</div>
		</Form>
	);
};

export default CheckoutForm;
