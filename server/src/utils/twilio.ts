import twilio from "twilio";
import env from "./env";
import type { TwilioProps } from "./types";

const accountid = env.TWILIO_ACCOUNT_ID;
const authToken = env.TWILIO_AUTH_TOKEN;
const client = twilio(accountid, authToken);

async function createMessage(
	body: string,
	to: string,
): Promise<TwilioProps | undefined> {
	const message = await client.messages.create({
		body,
		from: env.TWILIO_PHONE_NUMBER,
		to,
	});
	return JSON.parse(message.body);
}

export default createMessage;
