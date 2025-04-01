import { load } from "@cashfreepayments/cashfree-js";

const initializeSDK = async () => {
	const cashfree = await load({
		mode: "sandbox", //or production
	});
	return cashfree;
};

export default initializeSDK;
