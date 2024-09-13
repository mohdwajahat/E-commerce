import React from "react";

const FormCheckbox = ({ label, name ,size,defaultValue}) => {
	return (
		<div className="form-control items-center">
			<label htmlFor={name} className="label cursor-pointer">
				<span className="label-text">{label}</span>
				
			</label>
            <input
					name={name}
					type="checkbox"
					defaultChecked={defaultValue}
					className={`checkbox checkbox-primary ${size}`}
				/>
		</div>
	);
};

export default FormCheckbox;
