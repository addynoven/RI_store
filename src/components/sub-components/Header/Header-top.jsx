import { DropdownMenuRadioGroupDemo } from "../../custom-components/DropDown";
const HeaderTop = () => {
	return (
		<>
			<nav className="flex justify-between items-center  px-10 py-3 bg-gray-50 dark:bg-gray-700">
				<div className="max-w-screen-xl">
					<div className="flex items-center">
						<ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-[0.8rem]">
							<li>
								<a
									href="#"
									className="text-gray-900 dark:text-white hover:underline"
									aria-current="page"
								>
									ABOUT US
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-900 dark:text-white hover:underline"
								>
									MY ACCOUNT
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-900 dark:text-white hover:underline"
								>
									WHISLIST
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="flex flex-wrap justify-between items-center max-w-screen-xl">
					<div className="flex items-center space-x-6 rtl:space-x-reverse">
						<a
							href="tel:5541251234"
							className="text-[0.8rem]  text-gray-500 dark:text-white hover:underline"
						>
							GET SUPPORT FROM AN EXPERT - (1-844-916-0521)
						</a>
						<a
							href="#"
							className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
						>
							Login
						</a>
						<DropdownMenuRadioGroupDemo />
					</div>
				</div>
			</nav>
		</>
	);
};

export default HeaderTop;
