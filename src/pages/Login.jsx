import { setCredentials } from "@/slices/Authslice";
import { useLoginMutation } from "@/slices/userApiSlice";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();
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
		try {
			const res = await login({ email, password }).unwrap();
			console.log(res);
			dispatch(setCredentials({ ...res }));
			navigate(redirect);
		} catch (error) {
			toast.error(error?.data?.message || error.error, {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};
	return (
		<div className="my-7 lg:w-[40%] bg-[#fdfdfd] border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
			<div className="p-4 sm:p-7">
				<div className="text-center">
					<h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
						Sign in
					</h1>
					<p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
						Don't have an account yet? &nbsp;
						<a
							className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
							href="/signup"
						>
							Sign up here
						</a>
					</p>
				</div>

				<div className="mt-4">
					<button
						type="button"
						className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
					>
						<FaGoogle className="w-4 h-auto" />
						Sign in with Google
					</button>

					<div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
						Or
					</div>

					<form onSubmit={submitHandler}>
						<div className="grid gap-y-4">
							<div>
								<label
									htmlFor="email"
									className="block text-sm mb-2 dark:text-white"
								>
									Email address
								</label>
								<div className="relative">
									<input
										onChange={(e) => setEmail(e.target.value)}
										type="email"
										id="email"
										name="email"
										className="py-3 px-4 block w-full border-gray-200 border-[1px] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
										required
										aria-describedby="email-error"
									/>
									<div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
										{/* <FaExclamationCircle className="size-5 text-red-500" /> */}
									</div>
								</div>
								<p
									className="hidden text-xs text-red-600 mt-2"
									id="email-error"
								>
									Please include a valid email address so we can get back to you
								</p>
							</div>

							<div>
								<div className="flex justify-between items-center my-2">
									<label
										htmlFor="password"
										className="block text-sm mb-2 dark:text-white"
									>
										Password
									</label>
									<a
										className="inline-flex items-center gap-x-1 text-sm no-underline text-blue-600 decoration-2 hover:underline focus:outline-none focus:no-underline font-medium dark:text-blue-500"
										href="../examples/html/recover-account.html"
									>
										Forgot password?
									</a>
								</div>
								<div className="relative">
									<input
										onChange={(e) => setPassword(e.target.value)}
										type="password"
										id="password"
										name="password"
										className="py-3 px-4 block w-full border-gray-200  border-[1px] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
										required
										aria-describedby="password-error"
									/>
									<div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
										{/* <FaExclamationCircle className="size-5 text-red-500" /> */}
									</div>
								</div>
								<p
									className="hidden text-xs text-red-600 mt-2"
									id="password-error"
								>
									8+ characters required
								</p>
							</div>

							<div className="flex items-center">
								<div className="flex">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
									/>
								</div>
								<div className="ms-3">
									<label
										htmlFor="remember-me"
										className="text-sm dark:text-white"
									>
										Remember me
									</label>
								</div>
							</div>

							<button
								type="submit"
								className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
							>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
