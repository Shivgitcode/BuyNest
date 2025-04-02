import { addUser } from "@/actions/addUser";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSchema, type FormTypes } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon, UserPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const Signup = () => {
	const router = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const { mutateAsync: signup } = useMutation({
		mutationFn: addUser,
		onMutate: () => {
			toast.loading("Signing up", { id: "signup-toast" });
		},
		onError: (error) => {
			toast.dismiss("signup-toast");
			toast.success(error.message || "something went wrong");
		},
		onSuccess: (data) => {
			toast.success(data?.message);
			toast.dismiss("signup-toast");
			router("/auth/login");
		},
	});
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormTypes>({
		resolver: zodResolver(FormSchema),
	});
	const submitForm = async (data: FormTypes) => {
		console.log(data);
		signup({
			username: `${data.firstname} ${data.lastname}`,
			email: data.email,
			password: data.password,
			address: data.address,
			phoneNumber: Number.parseInt(data.phoneNumber),
		});
	};
	return (
		<div className="min-h-screen flex flex-col md:flex-row">
			{/* Left Side - Image */}
			<div className="hidden md:block md:w-1/2 bg-gray-100 relative animate-fade-in">
				<img
					src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800"
					alt="Signup background"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/40 flex items-center justify-center p-12">
					<div className="text-white max-w-md animate-slide-in">
						<h1 className="text-4xl font-bold mb-4">Join our community</h1>
						<p className="text-xl text-white/80">
							Create your account to start shopping and enjoy exclusive benefits
							and personalized recommendations.
						</p>
					</div>
				</div>
			</div>

			{/* Right Side - Signup Form */}
			<div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 animate-scale-in">
				<div className="w-full max-w-md">
					<div className="text-center mb-8">
						<Link to="/" className="text-2xl font-bold inline-block">
							BuyNest
						</Link>
						<h2 className="text-3xl font-bold mt-8 mb-2">Create Account</h2>
						<p className="text-gray-600">Enter your details to get started</p>
					</div>

					<form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="firstName">First Name</Label>
								<Input
									id="firstName"
									type="text"
									placeholder="Enter your first name"
									className="h-12"
									{...register("firstname", { required: true })}
								/>
								<p className="text-xs text-gray-500 mt-1 ">
									{errors.firstname ? errors.firstname.message : ""}
								</p>
							</div>
							<div className="space-y-2">
								<Label htmlFor="lastName">Last Name</Label>
								<Input
									id="lastName"
									type="text"
									placeholder="Enter your last name"
									className="h-12"
									{...register("lastname", { required: true })}
								/>
							</div>
							<p className="text-xs text-gray-500 mt-1 ">
								{errors.lastname ? errors.lastname.message : ""}
							</p>
						</div>

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
							<Label htmlFor="phonenumber">phone number</Label>
							<Input
								id="phonenumber"
								type="text"
								placeholder="Enter your phoneNumber"
								className="h-12"
								{...register("phoneNumber", { required: true })}
							/>
							<p className="text-xs text-gray-500 mt-1 ">
								{errors.phoneNumber ? errors.phoneNumber.message : ""}
							</p>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">address</Label>
							<Input
								id="address"
								type="text"
								placeholder="Enter your "
								className="h-12"
								{...register("address", { required: true })}
							/>
							<p className="text-xs text-gray-500 mt-1 ">
								{errors.address ? errors.address.message : ""}
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="Create a password"
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
							</div>
							<p className="text-xs text-gray-500 mt-1 ">
								{errors.password ? errors.password.message : ""}
							</p>
						</div>

						<div className="flex items-center space-x-2">
							<Checkbox id="terms" />
							<Label htmlFor="terms" className="text-sm font-normal">
								I agree to the{" "}
								<Link to="/terms" className="text-black underline">
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link to="/privacy" className="text-black underline">
									Privacy Policy
								</Link>
							</Label>
						</div>

						<Button
							type="submit"
							className="w-full h-12 flex items-center justify-center gap-2"
						>
							<UserPlus className="h-5 w-5" />
							Create Account
						</Button>
					</form>

					<div className="mt-8">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-200" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">
									Or sign up with
								</span>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-2 gap-4">
							<Button variant="outline" className="h-12">
								<svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
									<title>Google Icon</title>
									<path
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										fill="#4285F4"
									/>
									<path
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										fill="#34A853"
									/>
									<path
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
										fill="#FBBC05"
									/>
									<path
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
										fill="#EA4335"
									/>
								</svg>
								Google
							</Button>
							<Button variant="outline" className="h-12">
								<svg
									className="h-5 w-5 mr-2"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Facebook Icon</title>
									<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
								</svg>
								Facebook
							</Button>
						</div>
					</div>

					<p className="text-center mt-8 text-gray-600">
						Already have an account?{" "}
						<Link
							to="/auth/login"
							className="text-black font-medium hover:underline"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
