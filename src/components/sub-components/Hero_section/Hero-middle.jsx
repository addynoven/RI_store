import React from "react";
import banner_01 from "../../../assets/img/banner-01.jpg";
import banner_02 from "../../../assets/img/banner-02.jpg";
const HeroMiddle = () => {
	return (
		<>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
				<div className=" rounded-lg bg-gray-200">
					<div class="relative">
						<img
							class="w-full object-cover rounded-md"
							src={banner_01}
							alt="Random image"
						/>
						<div class="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
						<div class="absolute inset-0 flex items-center justify-center">
							<h2 class="text-white text-3xl font-bold">
								Get Lost in Mountains
							</h2>
						</div>
					</div>
				</div>
				<div className="rounded-lg bg-gray-200">
					<div class="relative">
						<img
							class="h-full w-full object-cover rounded-md"
							src={banner_02}
							alt="Random image"
						/>
						<div class="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
						<div class="absolute inset-0 flex items-center justify-center">
							<h2 class="text-white text-3xl font-bold">
								Get Lost in Mountains
							</h2>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HeroMiddle;
