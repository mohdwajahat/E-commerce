import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { loginUser } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export const action =
	(store) =>
	async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);
		try {
			const response = await customFetch.post("/auth/local", data);
			store.dispatch(loginUser(response.data));
			toast.success("Login Successful");
			return redirect("/");
		} catch (error) {
			console.log(error);
			const errorMessage =
				error?.response?.data?.error?.message ||
				"please double check your credentials";
			toast.error(errorMessage);
			return null;
		}
	};

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loginAsGuestUser = async () => {
		try {
			const response = await customFetch.post("/auth/local", {
				identifier: "test@test.com",
				password: "secret",
			});
			dispatch(loginUser(response.data));
			toast.success("Welcome Guest User");
			navigate("/");
		} catch (error) {
			console.log(error);
			toast.error("guest user login error. please try again");
		}
	};
	return (
		<section className="h-screen grid place-items-center">
			<Form
				method="post"
				className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
			>
				<h4 className="text-center text-3xl font-bold text-gray-600">
					Login
				</h4>
				<FormInput
					label="Email"
					placeholder="Enter your email"
					name="identifier"
					type="email"
				/>
				<FormInput
					label="Password"
					placeholder="Enter your password"
					name="password"
					type="password"
				/>
				<div className="mt4">
					<SubmitBtn text="LOGIN" />
				</div>
				<button
					type="button"
					onClick={loginAsGuestUser}
					className="btn hover:bg-purple-700 bg-purple-600 text-white btn-block"
				>
					GUEST USER
				</button>
				<p className="text-center">
					Not a memeber yet?
					<Link
						to={"/register"}
						className="ml-2 link link-hover link-primary capitalize"
					>
						register
					</Link>
				</p>
			</Form>
		</section>
	);
};

export default Login;
