import React from "react";

const CategoryCard = ({ ImgSrc, category }) => {
	return (
		<>
			<div className="relative">
				<img className="w-full" src={ImgSrc} alt="" />
				<div className="absolute top-0 w-full h-full flex justify-center items-end text-[#fff] border-[2px] bg-[#00000040] border-[#fff] bg-opacity-80 pb-5 font-semibold text-lg capitalize  ">
					{category}
				</div>
			</div>
		</>
	);
};

export default CategoryCard;
