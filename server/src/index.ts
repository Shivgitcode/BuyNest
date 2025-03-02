import express, {
	type NextFunction,
	type Request,
	type Response,
} from "express";
import type ErrorHandler from "./ErrorHandler/error";
import { logger } from "./logger/devLogger";
import { authRouter } from "./routes/auth.route";
import { dbConnect } from "./sequalize/db";
import "./utils/config";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { stream } from "./logger/devLogger";
import { productRouter } from "./routes/product.route";
import { defineAssociations } from "./sequalize/associations";
const app = express();
const port = process.env.PORT || 5000;

defineAssociations();
dbConnect();

app.use(morgan("combined", { stream: stream }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", authRouter, productRouter);

app.use(
	(err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
		const { message = "internal server error", status = 500 } = err;

		res.status(status as number).json({
			message: "Some error occured",
			error: message,
		});
		next(err);
	},
);

app.listen(port, () => {
	logger.info(`Server running on port ${port}`);
});
