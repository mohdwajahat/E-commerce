import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ComplexPaginationContainer = () => {
	const { meta } = useLoaderData();
	const { page, pageCount } = meta.pagination;
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const handlePageChange = (pageNumber) => {
		const searchParams = new URLSearchParams();
		searchParams.set("page", pageNumber);
		navigate(`${pathname}?${searchParams.toString()}`);
	};
	if (pageCount < 2) {
		return null;
	}

	const addPageButton = (pageNumber, activeClass) => {
		return (
			<button
				key={pageNumber}
				onClick={() => handlePageChange(pageNumber)}
				className={`btn btn-xs sm:btn-md border-none join-item ${
					activeClass ? "bg-base-300 border-base-300" : ""
				}`}
			>
				{pageNumber}
			</button>
		);
	};
	const renderPageButtons = () => {
		const pageButtons = [];
		pageButtons.push(addPageButton(1, page === 1));

		if (page > 2) {
			pageButtons.push(
				<button className="join-item btn btn-xs sm:btn-md" key="dots-1">
					...
				</button>
			);
		}

		if (page !== 1 && page !== pageCount) {
			pageButtons.push(addPageButton(page, true));
		}

		if (page < pageCount - 1) {
			pageButtons.push(
				<button className="join-item btn btn-xs sm:btn-md" key="dots-2">
					...
				</button>
			);
		}

		pageButtons.push(addPageButton(pageCount, page === pageCount));
		return pageButtons;
	};
	return (
		<div className="mt-16 flex justify-end">
			<div className="join">
				<button
					className="btn btn-xs sm:btn-md join-item"
					onClick={() => {
						let prevPage = page - 1;
						if (prevPage < 1) prevPage = pageCount;
						handlePageChange(prevPage);
					}}
				>
					PREV
				</button>

				{renderPageButtons()}
				<button
					className="btn btn-xs sm:btn-md join-item"
					onClick={() => {
						let nextPage = page + 1;
						if (nextPage > pageCount) nextPage = 1;
						handlePageChange(nextPage);
					}}
				>
					NEXT
				</button>
			</div>
		</div>
	);
};

export default ComplexPaginationContainer;
