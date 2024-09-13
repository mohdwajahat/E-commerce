import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SectionTitle, CartItemsList, CartTotals } from "../components";
const Cart = () => {
	const numItemsInCart = useSelector(
		(state) => state.cartState.numItemsInCart
	);
	const {user} = useSelector(state => state.userState)

	if (numItemsInCart === 0) {
		return (
			<div className="">
				<SectionTitle text="Your cart is empty" />
				<div className="flex justify-center mt-20">
					<Link className=" btn btn-lg btn-primary" to="/products">
						Go to products
					</Link>
				</div>
			</div>
		);
	}
	return (
		<>
			<SectionTitle text="Shopping cart" />
			<div className="mt-8 grid gap-8 lg:grid-cols-12">
				<div className="lg:col-span-8">
					<CartItemsList />
				</div>
				<div className="lg:col-span-4 lg:pl-4">
					<CartTotals />
					{user !== null ? (
						<Link
							to="/checkout"
							className="btn btn-primary btn-block mt-8"
						>
							Proceed to checkout
						</Link>
					) : (
						<Link
							to="/login"
							className="btn btn-primary btn-block mt-8"
						>
							Please Login
						</Link>
					)}
				</div>
			</div>
		</>
	);
};

export default Cart;
