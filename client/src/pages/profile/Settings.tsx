import { updateUser } from "@/actions/updateUser";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import {
	type PasswordProps,
	PasswordSchema,
	type ProfileProps,
	ProfileSchema,
} from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Settings = () => {
	const { user } = useAuth();
	const { mutateAsync: updateProfile } = useMutation({
		mutationFn: updateUser,
		onMutate: async () => {
			toast.loading("Updating your info", { id: "profile-id" });
		},
		onSuccess: async (data) => {
			toast.success(data.message);
			toast.dismiss("profile-id");
		},
		onError: (err) => {
			toast.error(err.message);
			toast.dismiss("profile-id");
		},
	});
	const profileForm = useForm<ProfileProps>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			username: user?.username || "",
			email: user?.email || "",
			phoneNumber: user?.phoneNumber.toString() || "",
			address: user?.address || "",
		},
	});
	const passwordForm = useForm<PasswordProps>({
		resolver: zodResolver(PasswordSchema),
	});
	const onProfileSubmit = async (data: ProfileProps) => {
		console.log(data);
		await updateProfile({ profileData: data, userId: user?.id as string });
	};
	const onPasswordSubmit = async (data: PasswordProps) => {
		console.log(data);
	};
	return (
		<div className="space-y-8">
			<Card>
				<CardHeader>
					<CardTitle>Personal Information</CardTitle>
					<CardDescription>Update your personal details</CardDescription>
				</CardHeader>
				<Form {...profileForm}>
					<form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={profileForm.control}
									name="username"
									render={({ field }) => (
										<FormItem className="space-y-2">
											<FormLabel>Full Name</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={profileForm.control}
									name="email"
									render={({ field }) => (
										<FormItem className="space-y-2">
											<FormLabel>Email Address</FormLabel>
											<FormControl>
												<Input type="email" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={profileForm.control}
									name="phoneNumber"
									render={({ field }) => (
										<FormItem className="space-y-2">
											<FormLabel>Phone Number</FormLabel>
											<FormControl>
												<Input type="tel" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={profileForm.control}
									name="address"
									render={({ field }) => (
										<FormItem className="space-y-2">
											<FormLabel>Address</FormLabel>
											<FormControl>
												<Input type="tel" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button type="submit">Save Changes</Button>
						</CardFooter>
					</form>
				</Form>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Password</CardTitle>
					<CardDescription>Change your password</CardDescription>
				</CardHeader>
				<Form {...passwordForm}>
					<form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
						<CardContent className="space-y-4">
							<FormField
								control={passwordForm.control}
								name="currentPassword"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel>Current Password</FormLabel>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={passwordForm.control}
								name="newPassword"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel>New Password</FormLabel>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={passwordForm.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter>
							<Button type="submit">Update Password</Button>
						</CardFooter>
					</form>
				</Form>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Notification Preferences</CardTitle>
					<CardDescription>
						Manage how you receive notifications
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center space-x-2">
						<Checkbox id="email-orders" defaultChecked />
						<Label htmlFor="email-orders">Email me about my orders</Label>
					</div>
					<div className="flex items-center space-x-2">
						<Checkbox id="email-promotions" defaultChecked />
						<Label htmlFor="email-promotions">
							Email me about promotions and new products
						</Label>
					</div>
					<div className="flex items-center space-x-2">
						<Checkbox id="sms-orders" />
						<Label htmlFor="sms-orders">
							SMS notifications about my orders
						</Label>
					</div>
				</CardContent>
				<CardFooter>
					<Button>Save Preferences</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Settings;
