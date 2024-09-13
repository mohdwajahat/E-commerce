import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavLinks = () => {
	const { user } = useSelector((state) => state.userState);

	const links = [
		{
			id: 1,
			url: "/",
			text: "Home",
		},
		{
			id: 2,
			url: "/about",
			text: "About",
		},
		{
			id: 3,
			url: "/products",
			text: "Products",
		},
		{
			id: 4,
			url: "/cart",
			text: "Cart",
		},
		{
			id: 5,
			url: "/checkout",
			text: "Checkout",
		},
		{
			id: 6,
			url: "/orders",
			text: "Orders",
		},
	];
	return (
		<>
			{links.map((link) => {
				const { id, url, text } = link;
				if (
					(url === "/oreders" || url === "/checkout") &&
					user === null
				) {
					return null;
				}
				return (
					<li key={id}>
						<NavLink className="capitalize" to={url}>
							{text}
						</NavLink>
					</li>
				);
			})}
		</>
	);
};

export default NavLinks;
