import { loginUser } from "@/actions/loginUser";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { type LoginProps, LoginSchema, type User } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const { setUser, user } = useAuth();
	const router = useNavigate();
	const { mutateAsync: signin } = useMutation({
		mutationFn: loginUser,
		onMutate: () => {
			toast.loading("Logging In", { id: "login-toast" });
		},
		onSuccess: (data) => {
			toast.success(data?.message);
			toast.dismiss("login-toast");
			setUser(data?.user as User);
			router("/");
		},
		onError: (err) => {
			toast.error(err.message);
			toast.dismiss("login-toast");
		},
	});

	useEffect(() => {
		console.log(user, "inside user");
		if (user) {
			router("/");
		}
	}, [user, router]);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginProps>({
		resolver: zodResolver(LoginSchema),
	});

	const submitForm = (data: LoginProps) => {
		signin(data);
	};

	return (
		<div className="min-h-screen flex flex-col md:flex-row">
			{/* Left Side - Image */}
			<div className="hidden md:block md:w-1/2 bg-gray-100 relative animate-fade-in">
				<img
					src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800"
					alt="Login background"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/40 flex items-center justify-center p-12">
					<div className="text-white max-w-md animate-slide-in">
						<h1 className="text-4xl font-bold mb-4">Welcome back</h1>
						<p className="text-xl text-white/80">
							Sign in to your account to continue your shopping experience and
							manage your orders.
						</p>
					</div>
				</div>
			</div>

			{/* Right Side - Login Form */}
			<div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 animate-scale-in">
				<div className="w-full max-w-md">
					<div className="text-center mb-8">
						<Link to="/" className="text-2xl font-bold inline-block">
							BuyNest
						</Link>
						<h2 className="text-3xl font-bold mt-8 mb-2">Sign In</h2>
						<p className="text-gray-600">Enter your details to continue</p>
					</div>

					<form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
						<div className="space-y-2">
							<Label htmlFor="email">Email address</Label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your email"
								className="h-12"
								{...register("email", { required: true })}
							/>
							<p className="text-xs text-gray-500 mt-1 ">
								{errors.email ? errors.email.message : ""}
							</p>
						</div>

						<div className="space-y-2">
							<div className="flex justify-between items-center">
								<Label htmlFor="password">Password</Label>
								<Link
									to="/auth/reset-password"
									className="text-sm text-gray-600 hover:text-black"
								>
									Forgot password?
								</Link>
							</div>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="Enter your password"
									className="h-12 pr-10"
									{...register("password", { required: true })}
								/>
								<button
									type="button"
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<EyeOffIcon className="h-5 w-5" />
									) : (
										<EyeIcon className="h-5 w-5" />
									)}
								</button>
								<p className="text-xs text-gray-500 mt-1 ">
									{errors.password ? errors.password.message : ""}
								</p>
							</div>
						</div>

						<div className="flex items-center space-x-2">
							<Checkbox id="remember" />
							<Label htmlFor="remember" className="text-sm font-normal">
								Remember me
							</Label>
						</div>

						<Button
							type="submit"
							className="w-full h-12 flex items-center justify-center gap-2"
						>
							<LogIn className="h-5 w-5" />
							Sign In
						</Button>
					</form>

					<div className="mt-8">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-200" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">
									Or continue with
								</span>
							</div>
						</div>
					</div>

					<p className="text-center mt-8 text-gray-600">
						Don't have an account?{" "}
						<Link
							to="/auth/signup"
							className="text-black font-medium hover:underline"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
