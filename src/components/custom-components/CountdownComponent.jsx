import React from "react";
import Countdown from "react-countdown";

// Random component for when the countdown is complete
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback function with a condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
	if (completed) {
		// Render a completed state
		return <Completionist />;
	} else {
		// Render a countdown
		return (
			<div className="flex gap-1">
				<button className="border-2 px-1">{days}</button> :
				<button className="border-2 px-1">{hours}</button> :
				<button className="border-2 px-1">{minutes}</button> :
				<button className="border-2 px-1">{seconds}</button>
			</div>
		);
	}
};

// Countdown component that uses the renderer
const CountdownComponent = () => (
	<Countdown date={Date.now() + 30 * 24 * 60 * 60 * 1000} renderer={renderer} />
);

export default CountdownComponent;
