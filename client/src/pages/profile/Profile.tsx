import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router";

const Profile = () => {
	const { user } = useAuth();

	return (
		<div className="space-y-8">
			<Card>
				<CardHeader>
					<CardTitle>Profile Information</CardTitle>
					<CardDescription>Manage your personal information</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col md:flex-row gap-6 items-start">
						<div className="flex-shrink-0">
							<img
								src={"/"}
								alt="Profile avatar"
								className="w-24 h-24 rounded-full object-cover"
							/>
						</div>
						<div className="space-y-4 flex-grow">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h2 className="text-sm font-medium text-gray-500">Name</h2>
									<p className="text-lg">{user?.username}</p>
								</div>
								<div>
									<h2 className="text-sm font-medium text-gray-500">Email</h2>
									<p className="text-lg">{user?.email}</p>
								</div>
								<div>
									<h2 className="text-sm font-medium text-gray-500">
										Member Since
									</h2>
									<p className="text-lg">
										{new Date(user?.createdAt as string).getFullYear()}
									</p>
								</div>
							</div>
							<div className="pt-4">
								<Button variant="outline" asChild>
									<Link to="/profile/settings">Edit Profile</Link>
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Recent Orders</CardTitle>
					<CardDescription>Your most recent purchases</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="bg-gray-50 p-4 rounded-md border">
							<div className="flex justify-between items-center">
								<div>
									<h3 className="font-medium">Order #12345</h3>
									<p className="text-sm text-gray-500">
										Placed on June 15, 2023
									</p>
								</div>
								<div className="text-right">
									<span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
										Delivered
									</span>
									<p className="text-sm font-medium">$149.99</p>
								</div>
							</div>
						</div>
						<div className="bg-gray-50 p-4 rounded-md border">
							<div className="flex justify-between items-center">
								<div>
									<h3 className="font-medium">Order #12344</h3>
									<p className="text-sm text-gray-500">
										Placed on May 28, 2023
									</p>
								</div>
								<div className="text-right">
									<span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
										Delivered
									</span>
									<p className="text-sm font-medium">$84.50</p>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-4 text-center">
						<Button variant="link" asChild>
							<Link to="/profile/orders">View All Orders</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Profile;
