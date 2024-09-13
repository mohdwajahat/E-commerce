import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ text }) => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<button
			disabled={isSubmitting}
			type="submit"
			className="btn btn-primary btn-block"
		>
			{isSubmitting ? (
				<>
					<span className="loading loading-spinner"></span>
					sending...
				</>
			) : (
				text || "Submit"
			)}
		</button>
	);
};

export default SubmitBtn;
