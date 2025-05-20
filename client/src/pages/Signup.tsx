import { addUser } from "@/actions/addUser";
import SignupAddressCollection from "@/components/auth/SignupAddressCollection";
import type { AddressData } from "@/components/auth/SignupAddressCollection";
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

type SignupStep = "form" | "address";
type SignupProvider = "email" | "google";

const Signup = () => {
	const router = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [signupStep, setSignupStep] = useState<SignupStep>("form");
	const [provider, setProvider] = useState<SignupProvider>("email");
	const [formData, setFormData] = useState<FormTypes | null>(null);

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
		watch,
	} = useForm<FormTypes>({
		resolver: zodResolver(FormSchema),
	});

	const handleRegularSignup = async (data: FormTypes) => {
		try {
			setFormData(data);
			setSignupStep("address");
		} catch (error) {
			console.error("Form validation error:", error);
			toast.error("Please fill all required fields correctly");
		}
	};

	const handleGoogleSignup = () => {
		setProvider("google");
		toast.success("Google authentication successful");
	};

	const handleAddressComplete = (addressData: AddressData) => {
		if (!formData) {
			toast.error("Form data is missing");
			return;
		}

		signup({
			username: `${formData.firstname} ${formData.lastname}`,
			email: formData.email,
			password: formData.password,
			address: JSON.stringify(addressData),
			phoneNumber: Number.parseInt(formData.phoneNumber),
		});
	};

	const handleAddressCancel = () => {
		setFormData(null);
		setSignupStep("form");
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

					{signupStep === "form" ? (
						<form
							className="space-y-6"
							onSubmit={handleSubmit(handleRegularSignup)}
						>
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
									<p className="text-xs text-gray-500 mt-1">
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
									<p className="text-xs text-gray-500 mt-1">
										{errors.lastname ? errors.lastname.message : ""}
									</p>
								</div>
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
								<p className="text-xs text-gray-500 mt-1">
									{errors.email ? errors.email.message : ""}
								</p>
							</div>

							<div className="space-y-2">
								<Label htmlFor="phoneNumber">Phone Number</Label>
								<Input
									id="phoneNumber"
									type="text"
									placeholder="Enter your phone number"
									className="h-12"
									{...register("phoneNumber", { required: true })}
								/>
								<p className="text-xs text-gray-500 mt-1">
									{errors.phoneNumber ? errors.phoneNumber.message : ""}
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
								<p className="text-xs text-gray-500 mt-1">
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
					) : (
						<SignupAddressCollection
							email={watch("email")}
							onComplete={handleAddressComplete}
							onCancel={handleAddressCancel}
						/>
					)}

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

						<div className="mt-6">
							<Button
								variant="outline"
								className="w-full h-12 flex items-center justify-center gap-2"
								onClick={handleGoogleSignup}
							>
								<img
									src="https://www.google.com/favicon.ico"
									alt="Google"
									className="w-5 h-5"
								/>
								Continue with Google
							</Button>
						</div>
					</div>

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Already have an account?{" "}
							<Link to="/auth/login" className="text-black font-medium">
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
