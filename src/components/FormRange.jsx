import { useState } from "react";
import { formatPrice } from "../utils";

const FormRange = ({ name, label, size }) => {
	const step = 1000;
    const maxPrice = 100000;
	const [price, setPrice] = useState(maxPrice);
	const handleChange = (e) => {
		setPrice(e.target.value);
	};
	return (
		<div className="form-control">
			<label htmlFor={name} className="label">
				<span className="label-text capitalize">{label}</span>
				<span>{formatPrice(price)}</span>
			</label>
			<input
				type="range"
				name={name}
				min={0}
				max={maxPrice}
				step={step}
				value={price}
				onChange={handleChange}
				className={`range range-primary ${size}`}
			/>
			<div className="w-full flex justify-between text-xs px-2 mt-2">
				<span className="font-bold text-md">0</span>
				<span className="font-bold text-md">
					Max : {formatPrice(maxPrice)}
				</span>
			</div>
		</div>
	);
};

export default FormRange;
