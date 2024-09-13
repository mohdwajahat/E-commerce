import { Link, useLoaderData } from "react-router-dom";
import { customFetch, formatPrice, generateAmountOptions } from "../utils/";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { useState } from "react";

const singleProductQuery = (id) => {
	return {
		queryKey: ["singleProduct", id],
		queryFn: () => customFetch(`/products/${id}`),
	};
};

export const loader =
	(queryClient) =>
	async ({ params }) => {
		const response = await queryClient.ensureQueryData(
			singleProductQuery(params.id)
		);
		const product = response.data.data;
		return product;
	};

const SingleProduct = () => {
	const product = useLoaderData();
	const { image, title, price, description, colors, company } =
		product.attributes;
	const dollarsPrice = formatPrice(price);

	const [productColor, setProductColor] = useState(colors[0]);
	const [amount, setAmount] = useState(1);
	const dispatch = useDispatch();

	const cartProduct = {
		cartId: `${product.id}${productColor}`,
		productId: product.id,
		image,
		title,
		price,
		company,
		productColor,
		amount,
	};
	const addToCart = () => {
		dispatch(addItem({ product: cartProduct }));
	};
	const handleAmount = (e) => {
		setAmount(parseInt(e.target.value));
	};
	return (
		<section>
			<div className="breadcrumbs text-md">
				<ul>
					<li>
						<Link to={"/"}>Home</Link>
					</li>
					<li>
						<Link to={"/products"}>Products</Link>
					</li>
				</ul>
			</div>
			<div className="mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16">
				<img
					src={image}
					alt={title}
					className="w-96 h-96 object-cover rounded-lg lg:w-full"
				/>
				<div>
					<h1 className="capitalize text-3xl font-bold">{title}</h1>
					<h4 className="text-xl text-neutral-content font-bold mt-2">
						{company}
					</h4>
					<p className="mt-3 text-xl">{dollarsPrice}</p>
					<p className="mt-6 leading-8">{description}</p>
					<div className="mt-6">
						<h4 className="text-md font-medium tracking-wider capitalize">
							colors
						</h4>
						<div className="mt-2">
							{colors.map((color) => (
								<button
									key={color}
									type="buttom"
									className={`badge w-6 h-6 mr-2 ${
										color === productColor &&
										`border-2 border-secondary`
									}`}
									style={{ backgroundColor: color }}
									onClick={() => {
										setProductColor(color);
									}}
								></button>
							))}
						</div>
					</div>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<h4 className="text-md font-medium tracking-wider capitalize">
								amount
							</h4>
						</label>
						<select
							className="select select-secondary select-bordered select-md"
							value={amount}
							onChange={handleAmount}
						>
							{generateAmountOptions(20)}
						</select>
					</div>
					<div className="mt-10 ">
						<button
							className="btn btn-secondary btn-md"
							onClick={() => addToCart()}
						>
							ADD TO BAG
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SingleProduct;
