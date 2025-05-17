import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OTPInput } from "input-otp";
import { useState } from "react";
import { toast } from "sonner";

interface OTPVerificationProps {
	onVerify: (data: { otp: string; email: string }) => void;
	onResend: () => void;
	email: string;
}

const OTPVerification = ({
	onVerify,
	onResend,
	email,
}: OTPVerificationProps) => {
	const [otp, setOtp] = useState("");
	const [isVerifying, setIsVerifying] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (otp.length === 4) {
			setIsVerifying(true);
			onVerify({ otp, email });
		} else {
			toast.error("Please enter a valid 6-digit code");
		}
	};

	return (
		<div className="w-full max-w-md mx-auto space-y-6">
			<div className="text-center space-y-2">
				<h3 className="text-xl font-semibold">Enter verification code</h3>
				<p className="text-sm text-gray-600">
					We've sent a 4-digit code to {email}
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-8">
				<div className="flex justify-center">
					<OTPInput
						value={otp}
						maxLength={4}
						onChange={(value) => setOtp(value)}
						containerClassName="flex items-center gap-2"
						render={({ slots }) => (
							<div className="flex items-center gap-2">
								{slots.map((slot, i) => (
									<div
										key={i}
										className={cn(
											"relative flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-sm shadow-sm transition-all",
											"data-[active=true]:border-primary data-[active=true]:ring-1 data-[active=true]:ring-ring",
											"data-[active=true]:ring-offset-2",
										)}
										data-active={slot.isActive}
									>
										{slot.char}
										{slot.hasFakeCaret && (
											<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
												<div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
											</div>
										)}
									</div>
								))}
							</div>
						)}
					/>
				</div>

				<div className="space-y-4">
					<Button
						type="submit"
						className="w-full"
						disabled={isVerifying || otp.length !== 4}
					>
						{isVerifying ? "Verifying..." : "Verify Email"}
					</Button>
					<div className="text-center">
						<button
							type="button"
							onClick={onResend}
							className="text-sm text-gray-600 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={isVerifying}
						>
							Didn't receive the code? Click to resend
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default OTPVerification;
