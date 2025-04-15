import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import "./config";
import { logger } from "../logger/devLogger";

const client = new S3Client({
	region: process.env.Region,
	credentials: {
		accessKeyId: process.env.ACCESS_ID as string,
		secretAccessKey: process.env.SECRET_ACCESS_ID as string,
	},
});

export async function putImage(
	img: Buffer,
	key: string,
): Promise<string | undefined> {
	try {
		const command = new PutObjectCommand({
			Bucket: process.env.BUCKET as string,
			Key: key,
			Body: img,
		});
		await client.send(command);
		logger.info("Image uploaded successfully", { file: "aws.ts" });
		return `https://${process.env.BUCKET}.s3.eu-north-1.amazonaws.com/${key}`;
	} catch (error) {
		if (error instanceof Error) {
			logger.error(error.message, { file: "aws.ts" });
			return undefined;
		}
		return undefined;
	}
}
