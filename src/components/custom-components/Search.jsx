import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
const Search = ({ className }) => {
	return (
		<>
			<Input
				type="search"
				placeholder="Search for the product that suits you..."
				className={cn("", className)}
			/>
		</>
	);
};

export default Search;
