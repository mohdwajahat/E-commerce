import { FormInput, FormSelect, FormRange, FormCheckbox } from "../components";
import { Link, Form, useLoaderData } from "react-router-dom";

const Filters = () => {
	const { meta, params } = useLoaderData();
	const { category, company, search, order, price, shipping } = params;
	const categories = meta.categories;
	const companies = meta.companies;
	return (
		<Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
			<FormInput
				label="search product"
				type="search"
				name="search"
				size="input-sm"
				defaultValue={search}
			/>
			<FormSelect
				label="select category"
				name="category"
				list={categories}
				size="select-sm"
				defaultValue={category}
			/>
			<FormSelect
				label="select company"
				name="company"
				list={companies}
				size="select-sm"
				defaultValue={company}
			/>
			<FormSelect
				label={"sort by"}
				name="order"
				list={["a-z", "z-a", "high", "low"]}
				size="select-sm"
				defaultValue={order}
			/>
			<FormRange
				label={"select price"}
				name="price"
				defaultValue={price}
				size={"range-sm"}
			/>
			<FormCheckbox
				label={"free shipping"}
				name="shipping"
				size={"checkbox-sm"}
				defaultValue={shipping}
			/>

			<button type="submit" className="btn btn-primary btn-sm ">
				SUBMIT
			</button>
			<Link
				to={"/products"}
				className="btn uppercase text-white btn-accent btn-sm"
			>
				Reset
			</Link>
		</Form>
	);
};

export default Filters;
