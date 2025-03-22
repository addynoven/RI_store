import { Spinner } from "react-bootstrap";

const Loader = () => {
	return (
		<>
			<div className="relative">
				<Spinner
					animation="border"
					role="status"
					style={{
						width: "100px",
						height: "100px",
						margin: "auto",
						display: "block",
					}}
				></Spinner>
				<span
					className="sr-only"
					style={{
						width: "100px",
						height: "100px",
						margin: "auto",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					Loading...
				</span>
			</div>
		</>
	);
};

export default Loader;
