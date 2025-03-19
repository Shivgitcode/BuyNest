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
import cors from "cors";
import morgan from "morgan";
import { stream } from "./logger/devLogger";
import { adminRouter } from "./routes/admin.route";
import { productRouter } from "./routes/product.route";
import { defineAssociations } from "./sequalize/associations";
const app = express();
const port = process.env.PORT || 5000;

defineAssociations();
dbConnect();

app.use(morgan(":method :url :status - :response-time ms", { stream }));
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:
			process.env.NODE === "production"
				? process.env.DEPLOYED_URL
				: "http://localhost:5173",
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	}),
);
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", authRouter, productRouter, adminRouter);

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
