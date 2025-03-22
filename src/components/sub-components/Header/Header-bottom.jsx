import React, { useEffect, useState } from "react";
import { DropdownMenuRadioGroupDemo as DropdownMenuDemo } from "../../custom-components/DropDown.jsx";
import dropDown from "../../../assets/dropDown.svg";
import Navmenu from "../../custom-components/Nav_menu.jsx";
import CountdownComponent from "../../custom-components/CountdownComponent.jsx";
function HeaderBottom({ className }) {
	return (
		<>
			<nav
				className={
					" justify-between items-center  px-10 py-3 bg-gray-50 dark:bg-gray-700 hidden lg:flex "
				}
			>
				<div className="max-w-screen-xl">
					<div className="flex items-center">
						<ul className="flex flex-row my-0 space-x-8 rtl:space-x-reverse text-[0.9rem] font-[650]">
							<li>
								<a href="#" className="text-[#3e4246] dark:text-white">
									EARRINGS
								</a>
							</li>
							<li>
								<a href="#" className="text-[#3e4246] dark:text-white">
									NECKLACES
								</a>
							</li>
							<li>
								<a href="#" className="text-[#3e4246] dark:text-white">
									BLOG
								</a>
							</li>
							<li>
								<a href="#" className="text-[#3e4246] dark:text-white">
									CONTACT
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="flex flex-wrap justify-between items-center max-w-screen-xl">
					<div className="flex items-center gap-2">
						<a
							href=""
							className="text-base font-[650] dark:text-white text-[#3e4246]"
						>
							MIDNIGHT SALES
						</a>
						<CountdownComponent />
					</div>
				</div>
			</nav>
		</>
	);
}

export default HeaderBottom;
