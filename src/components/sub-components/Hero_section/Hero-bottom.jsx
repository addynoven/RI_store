import React from "react";
// import BrandLogo from "@/components/custom-components/brand-logo";
import BrandLogo from "../../../assets/img/logo-01-1.png";
const Herobottom = () => {
	return (
		<>
			<section className="px-4 py-16 mx-auto max-w-7xl">
				<h1 className="mb-12 text-sm font-bold tracking-wide text-center text-gray-800 uppercase">
					We’re proud to have played a part in these amazing journeys.
				</h1>
				<div className="grid grid-cols-2 gap-10 text-center lg:grid-cols-8">
					<div className="flex items-center justify-center">
						<img
							src={BrandLogo}
							alt="Todoist Logo"
							className="block object-contain h-12"
						/>
					</div>
					<div className="flex items-center justify-center">
						<img
							src={BrandLogo}
							alt="Slack Logo"
							className="block object-contain h-12"
						/>
					</div>
					<div className="flex items-center justify-center">
						<img
							src={BrandLogo}
							alt="Typeform Logo"
							className="block object-contain h-12"
						/>
					</div>
					<div className="flex items-center justify-center">
						<img
							src={BrandLogo}
							alt="Algolia Logo"
							className="block object-contain h-12"
						/>
					</div>
					<div className="flex items-center justify-center">
						<img
							src={BrandLogo}
							alt="Postcss Logo"
							className="block object-contain h-12"
						/>
					</div>
					<div className="flex items-center justify-center">
						<img
							src={BrandLogo}
							alt="TailwindCSS Logo"
							className="block object-contain h-12"
						/>
					</div>
					<div className="flex items-center justify-center">
						<img
							src={BrandLogo}
							alt="Discord Logo"
							className="block object-contain h-12"
						/>
					</div>
					<div className="flex items-center justify-center">
						<img
							src={BrandLogo}
							alt="Vimeo Logo"
							className="block object-contain h-12"
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default Herobottom;
