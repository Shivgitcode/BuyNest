import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export interface AddressData {
	street: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

interface SignupAddressCollectionProps {
	email: string;
	onComplete: (data: AddressData) => void;
	onCancel: () => void;
}

const SignupAddressCollection = ({
	email,
	onComplete,
	onCancel,
}: SignupAddressCollectionProps) => {
	const [address, setAddress] = useState<AddressData>({
		street: "",
		city: "",
		state: "",
		zipCode: "",
		country: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onComplete(address);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="text-center mb-8">
				<h3 className="text-xl font-semibold">Add Your Address</h3>
				<p className="text-gray-600 mt-2">
					Please provide your delivery address for {email}
				</p>
			</div>

			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="street">Street Address</Label>
					<Input
						id="street"
						type="text"
						placeholder="Enter your street address"
						className="h-12"
						value={address.street}
						onChange={(e) =>
							setAddress((prev) => ({ ...prev, street: e.target.value }))
						}
						required
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="city">City</Label>
						<Input
							id="city"
							type="text"
							placeholder="Enter your city"
							className="h-12"
							value={address.city}
							onChange={(e) =>
								setAddress((prev) => ({ ...prev, city: e.target.value }))
							}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="state">State</Label>
						<Input
							id="state"
							type="text"
							placeholder="Enter your state"
							className="h-12"
							value={address.state}
							onChange={(e) =>
								setAddress((prev) => ({ ...prev, state: e.target.value }))
							}
							required
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="zipCode">ZIP Code</Label>
						<Input
							id="zipCode"
							type="text"
							placeholder="Enter your ZIP code"
							className="h-12"
							value={address.zipCode}
							onChange={(e) =>
								setAddress((prev) => ({ ...prev, zipCode: e.target.value }))
							}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="country">Country</Label>
						<Input
							id="country"
							type="text"
							placeholder="Enter your country"
							className="h-12"
							value={address.country}
							onChange={(e) =>
								setAddress((prev) => ({ ...prev, country: e.target.value }))
							}
							required
						/>
					</div>
				</div>
			</div>

			<div className="flex gap-4">
				<Button
					type="button"
					variant="outline"
					className="flex-1 h-12"
					onClick={onCancel}
				>
					Back
				</Button>
				<Button type="submit" className="flex-1 h-12">
					Complete Signup
				</Button>
			</div>
		</form>
	);
};

export default SignupAddressCollection;
