import Header_img from "../../../assets/Header_logo.png";
import Menu from "../../../assets/menu.svg";
import Search from "../../custom-components/Search.jsx";
import user from "../../../assets/user.svg";
import heart from "../../../assets/heart.svg";
import backArrow from "../../../assets/backArrow.svg";
import shoppingBag from "../../../assets/shoppingBag.svg";
import { Link } from "react-router-dom";
const HeaderMain = () => {
	return (
		<>
			<div className="flex items-center gap-4">
				<Link to={"/"}>
					<img src={Header_img} alt="" className="w-40 " />
				</Link>
				<button>
					<img src={Menu} alt="" />
				</button>
				<div className="w-[70vw]">
					<Search className="bg-[#e9ecef] py-6 rounded-sm" />
				</div>
				<div className="flex items-center justify-evenly gap-2">
					<img src={user} alt="" />
					<img src={heart} alt="" />
					<img src={backArrow} alt="" />
					<img src={shoppingBag} alt="" />
				</div>
			</div>
		</>
	);
};

export default HeaderMain;
