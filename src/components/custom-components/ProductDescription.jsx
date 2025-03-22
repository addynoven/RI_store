import React, { useState } from "react";

const ProductDescription = ({ description }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleReadMore = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div>
			<p className="">
				{isExpanded ? description : `${description.slice(0, 150)}...`}
				{description.length > 150 && (
					<span
						onClick={toggleReadMore}
						className="text-blue-600 cursor-pointer hover:underline"
					>
						{isExpanded ? " Read less" : " Read more"}
					</span>
				)}
			</p>
		</div>
	);
};

export default ProductDescription;
