import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { logger } from "../logger/devLogger";
import env from "./env";

const client = new S3Client({
	region: process.env.Region,
	credentials: {
		accessKeyId: env.ACCESS_ID as string,
		secretAccessKey: env.SECRET_ACCESS_ID as string,
	},
});

export async function putImage(
	img: Buffer,
	key: string,
): Promise<string | undefined> {
	try {
		const command = new PutObjectCommand({
			Bucket: env.BUCKET as string,
			Key: key,
			Body: img,
		});
		await client.send(command);
		logger.info("Image uploaded successfully", { file: "aws.ts" });
		return `https://${env.BUCKET}.s3.eu-north-1.amazonaws.com/${key}`;
	} catch (error) {
		if (error instanceof Error) {
			logger.error(error.message, { file: "aws.ts" });
			return undefined;
		}
		return undefined;
	}
}
