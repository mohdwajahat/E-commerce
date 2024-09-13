import { Outlet } from "react-router-dom";
import { Header, Navbar, Loading } from "../components";
import { useNavigation } from "react-router-dom";

const HomeLayout = () => {
	const navigation = useNavigation();
	return (
		<>
			<Header />
			<nav>
				<Navbar />
			</nav>
			{navigation.state === "loading" ? (
				<Loading />
			) : (
				<section className="align-element py-20">
					<Outlet />
				</section>
			)}
		</>
	);
};

export default HomeLayout;
