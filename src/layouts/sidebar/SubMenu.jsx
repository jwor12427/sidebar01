/** @format */

import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const SubMenu = ({ data }) => {
	const { pathname } = useLocation();
	const [subMenuOpen, setSubMenuOpen] = useState(false);

	return (
		<>
			<li
				className={`link ${pathname.includes(data.name) && "text-[#E21818]"}`}
				onClick={() => setSubMenuOpen(!subMenuOpen)}
			>
				{/* dynamic icons */}

				<data.icon
					size={23}
					className="min-w-max"
				/>
				<p className="capitalize flex-1">{data.name}</p>
				<MdKeyboardArrowDown
					className={`${subMenuOpen && "rotate-180"} duration-200`}
				/>
			</li>
			<motion.ul
				animate={
					subMenuOpen
						? {
								height: "fit-content",
						  }
						: {
								height: 0,
						  }
				}
				className="flex flex-col pl-14 text-[0.8rem] font-normal overflow-hidden h-0"
			>
				{data.menus.map((menu) => (
					<li
						key={menu}
						// /build/auth
						// /build/hosting
					>
						<NavLink
							to={`/${data.name}/${menu}`}
							className="link !bg-transparent capitalize"
						>
							{menu}
						</NavLink>
					</li>
				))}
			</motion.ul>
		</>
	);
};

export default SubMenu;
