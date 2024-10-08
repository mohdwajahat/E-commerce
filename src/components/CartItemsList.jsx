import { useSelector } from "react-redux";
import { CartItem } from "./";
const CartItemsList = () => {
	const cartItems = useSelector((state) => state.cartState.cartItems);

	return (
		<div>
			{cartItems.map((item) => {
				return <CartItem key={item.cartId} cartItem={item} />;
			})}
		</div>
	);
};

export default CartItemsList;
