import { Filters, ProductsContainer, PaginationContainer } from "../components";
import { customFetch } from "../utils";

const allProductsQuery = (queryParams) => {
	const { search, category, company, sort, price, shipping, page } =
		queryParams;

	return {
		queryKey: [
			"products",
			search ?? "",
			category ?? "all",
			company ?? "all",
			sort ?? "a-z",
			price ?? 100000,
			shipping ?? false,
			page ?? 1,
		],
		queryFn: () =>
			customFetch(url, {
				params: queryParams,
			}),
	};
};
// you can pass UrlSearchParams to the customFetch function or just the plain object that contains the params it works completely the same But the better way is to use the plainObject
const url = "/products";
export const loader =
	(queryClient) =>
	async ({ request }) => {
		//for detail explanation of how this works, check out this link "https://chatgpt.com/share/2f10705a-bc08-4fb5-923a-45cb1de6ccfe"
		const params = Object.fromEntries([
			...new URL(request.url).searchParams.entries(),
		]);
		// console.log(params);
		const response = await queryClient.ensureQueryData(
			allProductsQuery(params)
		);
		const products = response.data.data;
		const meta = response.data.meta;
		return { products, meta, params };
	};

const Products = () => {
	return (
		<>
			<Filters />
			<ProductsContainer />
			<PaginationContainer />
		</>
	);
};

export default Products;
