import { Hero } from "../components";
import { customFetch } from "../utils/";
import { FeaturedProducts } from "../components";

const url = "/products?featured=true";

const featuredProductsQuery = {
	queryKey: ['featuredProducts'],
	queryFn: () => customFetch(url),
  };

const loader = (queryClient) => async () => {
	const response = await queryClient.ensureQueryData(featuredProductsQuery)
	const products = response.data.data || [];
	return { products };
};

const Landing = () => {
	return (
		<div>
			<Hero />
			<FeaturedProducts />
		</div>
	);
};

export { loader };

export default Landing;
