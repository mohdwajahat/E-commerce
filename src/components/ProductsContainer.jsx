import { useLoaderData } from "react-router-dom";
import { ProductsList, ProductsGrid } from "../components";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";

const ProductsContainer = () => {
	const { meta } = useLoaderData();
	const totalProducts = meta.pagination.total;
	const [layout, setLayout] = useState("grid");

	const setActiveLayout = (pattern) => {
		return `text-xl btn btn-circle btn-sm ${
			layout === pattern
				? "btn-primary text-primary-content"
				: "btn-ghost text-base-content"
		}`;
	};
	return (
		<>
			<div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
				<h4 className="font-medium text-md">
					{totalProducts} product{totalProducts > 1 && "s"}
				</h4>
				<div className="flex gap-x-2">
					<button
						onClick={() => setLayout("grid")}
						className={setActiveLayout("grid")}
					>
						<BsFillGridFill />
					</button>
					<button
						onClick={() => setLayout("list")}
						className={setActiveLayout("list")}
					>
						<BsList />
					</button>
				</div>
			</div>

			{totalProducts === 0 ? (
				<div className="text-2xl mt-16 flex justify-center items-center">
					<h4 className="text-md">No products found</h4>
				</div>
			) : layout === "grid" ? (
				<ProductsGrid />
			) : (
				<ProductsList />
			)}
		</>
	);
};

export default ProductsContainer;
