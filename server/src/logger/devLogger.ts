import { createLogger, format, transports } from "winston";

const { printf, cli, timestamp, colorize, align, combine } = format;
const logFormat = printf(
	({ level, message, timeStamp, ...meta }) =>
		`[${timestamp} ${level} :${message} ${JSON.stringify(meta)}]`,
);
export const logger = createLogger({
	level: "debug",
	format: combine(
		colorize(),
		timestamp({
			format: "YYYY-MM-DD hh:mm:ss",
		}),
		cli(),
		logFormat,
	),
	transports: [new transports.Console()],
});
