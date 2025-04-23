function generateOtp() {
	const otp = Math.floor(Math.random() * 9000 + 1000);
	const expiresIn = 5 * 60 * 1000;
	const expiresAt = Date.now() * expiresIn;
	return { otp, expiresAt };
}

export default generateOtp;
