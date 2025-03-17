import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import "./config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { logger } from "../logger/devLogger";
const client = new S3Client({
	region: process.env.Region,
	credentials: {
		accessKeyId: process.env.ACCESS_ID as string,
		secretAccessKey: process.env.SECRET_ACCESS_ID as string,
	},
});

export async function putImage(img: Buffer, key: string) {
	try {
		const command = new PutObjectCommand({
			Bucket: process.env.BUCKET as string,
			Key: key,
			Body: img,
		});
		await client.send(command);
		logger.info("Image uploaded successfully", { file: "aws.ts" });
	} catch (error) {
		if (error instanceof Error) logger.error(error.message, { file: "aws.ts" });
	}
}

export async function signedUrl(key: string) {
	try {
		const command = new GetObjectCommand({
			Bucket: process.env.BUCKET as string,
			Key: key,
		});
		const url = await getSignedUrl(client, command);
		return url;
	} catch (error) {
		if (error instanceof Error) logger.error(error.message, { file: "aws.ts" });
	}
}
