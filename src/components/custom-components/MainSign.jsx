import React from "react";
// Import your SVGs here
// import GoogleIcon from 'path/to/google-icon';
// import AppleIcon from 'path/to/apple-icon';

const Login = () => {
	return (
		<section className="px-4 py-24 mx-auto max-w-7xl">
			<div className="w-full mx-auto space-y-5 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
				<h1 className="text-4xl font-semibold text-center text-gray-900">
					Login
				</h1>
				<div className="pb-6 space-y-2 border-b border-gray-200">
					<a href="#" className="w-full py-3 btn btn-icon btn-google">
						{/* Replace with your imported SVG */}
						<GoogleIcon className="mr-1" width="24" height="24" />
						Continue with Google
					</a>
					<a href="#" className="w-full py-3 btn btn-icon btn-dark">
						{/* Replace with your imported SVG */}
						<AppleIcon className="mr-1" width="24" height="24" />
						Continue with Apple
					</a>
				</div>
				<form className="space-y-4">
					<label className="block">
						<span className="block mb-1 text-xs font-medium text-gray-700">
							Your Email
						</span>
						<input
							className="form-input"
							type="email"
							placeholder="Ex. james@bond.com"
							inputMode="email"
							required
						/>
					</label>
					<label className="block">
						<span className="block mb-1 text-xs font-medium text-gray-700">
							Your Password
						</span>
						<input
							className="form-input"
							type="password"
							placeholder="••••••••"
							required
						/>
					</label>
					<input
						type="submit"
						className="w-full py-3 btn btn-primary"
						value="Continue with email"
					/>
				</form>
				<div className="my-2 text-center">
					<a
						href="#"
						className="text-sm text-gray-700 underline hover:text-purple-700"
					>
						Forgot password
					</a>
				</div>
			</div>
		</section>
	);
};

export default Login;
