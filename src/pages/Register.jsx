import { setCredentials } from "@/slices/Authslice";
import { useRegisterMutation } from "@/slices/userApiSlice";
import { useEffect, useState } from "react";
import { FaGoogle, FaExclamationCircle as ErrorIcon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [register] = useRegisterMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userInfo } = useSelector((state) => state.auth);
	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get("redirect") || "/";

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (confirmPassword != password) {
			toast.error("Passwords do not match");
			return;
		}
		try {
			const res = await register({ name, email, password }).unwrap();
			console.log(res);
			dispatch(setCredentials({ ...res }));
			navigate("/");
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};
	return (
		<>
			<div className="my-7  lg:w-[40%] bg-white border border-gray-200 rounded-xl shadow-sm">
				<div className="p-4 sm:p-7">
					<div className="text-center">
						<h1 className="block text-2xl font-bold text-gray-800">Sign up</h1>
						<p className="mt-2 text-sm text-gray-600">
							Already have an account?
							<a
								className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
								href="../examples/html/signin.html"
							>
								Sign in here
							</a>
						</p>
					</div>

					<div className="mt-5">
						<button
							type="button"
							className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
						>
							<FaGoogle className="w-4 h-auto" />
							Sign up with Google
						</button>

						<div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
							Or
						</div>

						<form onSubmit={submitHandler}>
							<div className="grid gap-y-4">
								<div>
									<label htmlFor="Name" className="block text-sm mb-2">
										Name
									</label>
									<div className="relative">
										<input
											type="text"
											id="Name"
											name="Name"
											className=" py-2 px-2 block w-full border-gray-300 border-[2px] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
											required
											aria-describedby="email-error"
											onChange={(e) => setName(e.target.value)}
										/>
										<div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
											<ErrorIcon className="size-5 text-red-500" />
										</div>
									</div>
									<p
										className="hidden text-xs text-red-600 mt-2"
										id="email-error"
									>
										Please include a valid email address so we can get back to
										you
									</p>
								</div>
								<div>
									<label htmlFor="email" className="block text-sm mb-2">
										Email address
									</label>
									<div className="relative">
										<input
											type="email"
											id="email"
											name="email"
											className=" py-2 px-2 block w-full border-gray-300 border-[2px] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
											required
											aria-describedby="email-error"
											onChange={(e) => setEmail(e.target.value)}
										/>
										<div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
											<ErrorIcon className="size-5 text-red-500" />
										</div>
									</div>
									<p
										className="hidden text-xs text-red-600 mt-2"
										id="email-error"
									>
										Please include a valid email address so we can get back to
										you
									</p>
								</div>

								<div>
									<label htmlFor="password" className="block text-sm mb-2">
										Password
									</label>
									<div className="relative">
										<input
											type="password"
											id="password"
											name="password"
											className="py-2 px-2 block w-full border-gray-300 border-[2px] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
											required
											aria-describedby="password-error"
											onChange={(e) => setPassword(e.target.value)}
										/>
										<div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
											<ErrorIcon className="size-5 text-red-500" />
										</div>
									</div>
									<p
										className="hidden text-xs text-red-600 mt-2"
										id="password-error"
									>
										8+ characters required
									</p>
								</div>

								<div>
									<label
										htmlFor="confirm-password"
										className="block text-sm mb-2"
									>
										Confirm Password
									</label>
									<div className="relative">
										<input
											type="password"
											id="confirm-password"
											name="confirm-password"
											className="py-2 px-2 block w-full border-gray-300 border-[2px] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
											required
											aria-describedby="confirm-password-error"
											onChange={(e) => {
												setConfirmPassword(e.target.value);
											}}
										/>
										<div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
											<ErrorIcon className="size-5 text-red-500" />
										</div>
									</div>
									<p
										className="hidden text-xs text-red-600 mt-2"
										id="confirm-password-error"
									>
										Password does not match the password
									</p>
								</div>

								<div className="flex items-center">
									<div className="flex">
										<input
											id="remember-me"
											name="remember-me"
											type="checkbox"
											className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
										/>
									</div>
									<div className="ms-3">
										<label htmlFor="remember-me" className="text-sm">
											I accept the{" "}
											<a
												className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
												href="#"
											>
												Terms and Conditions
											</a>
										</label>
									</div>
								</div>

								<button
									type="submit"
									className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
								>
									Sign up
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
