import { createLogger, format, transports } from "winston";

const { printf, cli, timestamp, colorize, combine, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
	return `[${timestamp}] ${level}: ${message} ${
		stack ? `\nStack: ${stack}` : ""
	} ${Object.keys(meta).length ? JSON.stringify(meta) : ""}`;
});

export const logger = createLogger({
	level: "debug",
	format: combine(
		timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		colorize(),
		errors({ stack: true }),
		cli(),
		logFormat,
	),
	transports: [new transports.Console()],
});

export const stream = {
	write: (message: string) => {
		logger.info(message.trim());
	},
};
