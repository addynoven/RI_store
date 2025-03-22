import { FaRegStar, FaStar, FaStarHalf } from "react-icons/fa";

const Rating = ({ Values }) => {
	const spans = Array.from({ length: 5 }).map((_, index) => (
		<span key={index}>
			{Values >= index + 1 ? (
				<FaStar className="text-yellow-400" />
			) : Values >= index + 0.5 ? (
				<FaStarHalf className="text-yellow-400" />
			) : (
				<FaRegStar className="text-yellow-400" />
			)}
		</span>
	));
	return (
		<span className="rating mr-2 flex items-center gap-1">
			{spans}
			<span className=" ml-2 rating-text">{Number(Values).toFixed(2)}</span>
		</span>
	);
};

export default Rating;
