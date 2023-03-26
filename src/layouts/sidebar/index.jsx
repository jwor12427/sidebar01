/** @format */

import React, { useState, useEffect } from "react";
//리액트 모션 애니메이션
import { motion } from "framer-motion";

import { NavLink, useLocation } from "react-router-dom";
//리액트 반응형
import { useMediaQuery } from "react-responsive";

// react-icons
import { BiArrowBack } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { RiUserStarLine } from "react-icons/ri";
import { BsDatabaseCheck } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { IoBuildOutline } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";
import { HiMenuAlt1 } from "react-icons/hi";

import SubMenu from "./SubMenu";

const Sidebar = () => {
	//미디어
	let isTab = useMediaQuery({ query: "(max-width: 768px)" });
	//console.log("isTab", isTab); 768px일시 true가 출력

	//하위요소 클릭시 상위요소의 링크색도 변화
	const { pathname } = useLocation();

	// 메뉴 열고 닫기 - 768px이하 일시 자동으로 닫힘
	const [isOpen, setIsOpen] = useState(isTab ? false : true);

	//애니메이션
	const Sidebar_animation = isTab
		? {
				//mobile view
				open: {
					x: 0,
					width: "16rem",
					transition: {
						damping: 40,
					},
				},
				closed: {
					x: -250,
					width: 0,
					transition: {
						damping: 40,
						delay: 0.15,
					},
				},
		  }
		: {
				//system view
				open: {
					width: "16rem",
					transition: {
						damping: 40,
					},
				},
				closed: {
					width: "4rem",
					transition: {
						damping: 40,
					},
				},
		  };

	//모바일 환경설정
	useEffect(() => {
		if (isTab) {
			//mobile
			setIsOpen(false);
		} else {
			//laptop
			setIsOpen(true);
		}
	}, [isTab]);

	//pathname change -> close sidebar
	useEffect(() => {
		isTab && setIsOpen(false);
	}, [pathname]);

	//서브메뉴
	const subMenusList = [
		{
			//main menu name like(all apps, setting)
			name: "build",
			icon: IoBuildOutline,
			//submenus
			menus: ["auth", "app settings", "stroage", "hosting"],
		},
		{
			name: "analytics",
			icon: SiGoogleanalytics,
			menus: ["dashboard", "realtime", "events"],
		},
	];

	return (
		<div>
			<div
				onClick={() => setIsOpen(false)}
				className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
					isOpen ? "block" : "hidden"
				}`}
			></div>
			<motion.div
				variants={Sidebar_animation}
				initial={{ x: isTab ? -250 : 0 }}
				animate={isOpen ? "open" : "closed"}
				className="bg-white text-gray shadow-xl z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden md:relative fixed"
			>
				{/* logo */}
				<div className="flex items-center gap-2.5 font-medium border-b border-slate-300 py-3 mx-3 mt-7">
					<img
						src="../../../public/logo.png"
						alt="logo"
						className="w-[40px] rounded-3xl"
					/>
					<span className="text-xl whitespace-pre ml-3">MyAdmin</span>
				</div>

				{/* close */}
				<div
					onClick={() => setIsOpen(!isOpen)}
					className="absolute w-fit h-fit z-50 right-3 top-1 cursor-pointer md:block hidden"
				>
					<BiArrowBack size={25} />
				</div>

				{/* Menus */}
				<div className="flex flex-col h-full">
					{/* first */}
					<ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 h-[70%] md:h-[68%]">
						<li>
							<NavLink
								to="/"
								className={"link"}
							>
								<RxDashboard
									size={23}
									className="min-w-max"
								/>
								All Apps
							</NavLink>
						</li>
						{/* //all apps */}

						<li>
							<NavLink
								to="/authentication"
								className={"link"}
							>
								<RiUserStarLine
									size={23}
									className="min-w-max"
								/>
								Authentication
							</NavLink>
						</li>
						{/* //authentication */}

						<li>
							<NavLink
								to="/stroage"
								className={"link"}
							>
								<BsDatabaseCheck
									size={23}
									className="min-w-max"
								/>
								Stroage
							</NavLink>
						</li>
						{/* //stroage */}

						{/* subMenu */}
						{/* mobile view most show submenus */}
						{(isOpen || isTab) && (
							<div className="border-y py-5 border-slate-300">
								<small className="pl-3 text-slate-500 inline-block mb-2">
									Product categories
								</small>
								{subMenusList.map((menu) => (
									<div
										key={menu.name}
										className="flex flex-col gap-1"
									>
										<SubMenu data={menu} />
									</div>
								))}
							</div>
						)}

						<li>
							<NavLink
								to="/settings"
								className={"link"}
							>
								<AiOutlineSetting
									size={23}
									className="min-w-max"
								/>
								Settings
							</NavLink>
						</li>
						{/* //settings */}
					</ul>
					{/* second */}
					{isOpen && (
						<div className="flex-1 text-sm z-50 max-h-48 my-auto whitespace-pre w-full font-medium">
							<div className="flex items-center justify-between border-y border-slate-300 p-4">
								<div>
									<p>Spark</p>
									<small>No-cost $0/month</small>
								</div>

								<p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
									Upgrade
								</p>
							</div>
						</div>
					)}
				</div>
			</motion.div>

			{/* 햄버거 메뉴 */}
			<div
				className="m-3 md:hidden"
				onClick={() => setIsOpen(true)}
			>
				<HiMenuAlt1 size={25} />
			</div>
		</div>
	);
};

export default Sidebar;
