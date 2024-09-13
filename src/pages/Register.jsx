import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		const response = await customFetch.post("/auth/local/register", data);
		toast.success("Account Created Successfully");
		return redirect("/login");
	} catch (error) {
		const errorMessage =
			error?.response?.data?.error?.message ||
			"please double check your credentials";

		toast.error(errorMessage);
		return null;
	}
};

const Register = () => {
	return (
		<section className="h-screen grid place-items-center">
			<Form
				method="POST"
				className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
			>
				<h4 className="text-center text-3xl font-bold text-gray-700">
					Register
				</h4>
				<FormInput
					label={"username"}
					placeholder={"Enter your username"}
					name={"username"}
					type={"text"}
				/>
				<FormInput
					label={"Email"}
					placeholder={"Enter your email"}
					name={"email"}
					type={"email"}
				/>
				<FormInput
					label={"Password"}
					placeholder={"Enter your password"}
					name={"password"}
					type={"password"}
				/>
				<div className="mt4">
					<SubmitBtn text={"REGISTER"} />
				</div>
				<p className="text-center">
					Not a memeber yet?
					<Link
						to={"/login"}
						className="ml-2 link link-hover link-primary capitalize"
					>
						login
					</Link>
				</p>
			</Form>
		</section>
	);
};

export default Register;
