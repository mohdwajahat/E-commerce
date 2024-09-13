import { Link, useRouteError } from "react-router-dom";

const Error = () => {
	const error = useRouteError();
	console.log(error);
	if (error.status === 404) {
		return (
			<div className="h-screen w-full flex flex-col justify-center items-center">
				<h1 className="text-9xl  font-medium text-primary">404</h1>
				<h4 className="text-4xl text-gray-700 my-6 font-semibold md:text-5xl">
					Page not found
				</h4>
				<p className="text-xl text-gray-700">
					Sorry, we couldn&apos;t find the page you&apos;re looking
					for.
				</p>
				<Link
					className="btn bg-purple-700 hover:bg-purple-800 text-white my-6"
					to={"/"}
				>
					GO BACK HOME
				</Link>
			</div>
		);
	}
	return (
		<main className="grid min-h-[100vh] place-items-center px-8 ">
			<h4 className="text-center font-bold text-4xl">
				there was an error...{" "}
			</h4>
		</main>
	);
};

export default Error;
