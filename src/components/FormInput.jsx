const FormInput = ({
	label,
	placeholder = "",
	type,
	name,
	size,
	defaultValue = "",
}) => {
	return (
		<div className="form-control">
			<label htmlFor={name} className="label">
				<span className="label-text capitalize">{label}</span>
			</label>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				defaultValue={defaultValue}
				className={`input input-bordered ${size}`}
			/>
		</div>
	);
};

export default FormInput;
