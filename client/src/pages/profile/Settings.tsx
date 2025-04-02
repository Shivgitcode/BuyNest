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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Settings = () => {
	return (
		<div className="space-y-8">
			<Card>
				<CardHeader>
					<CardTitle>Personal Information</CardTitle>
					<CardDescription>Update your personal details</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="name">Full Name</Label>
							<Input id="name" defaultValue="John Doe" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email Address</Label>
							<Input
								id="email"
								type="email"
								defaultValue="john.doe@example.com"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="phone">Phone Number</Label>
							<Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button>Save Changes</Button>
				</CardFooter>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Password</CardTitle>
					<CardDescription>Change your password</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="current-password">Current Password</Label>
						<Input id="current-password" type="password" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="new-password">New Password</Label>
						<Input id="new-password" type="password" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirm-password">Confirm Password</Label>
						<Input id="confirm-password" type="password" />
					</div>
				</CardContent>
				<CardFooter>
					<Button>Update Password</Button>
				</CardFooter>
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
