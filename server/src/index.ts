// import "./utils/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
	type NextFunction,
	type Request,
	type Response,
} from "express";
import morgan from "morgan";
import type ErrorHandler from "./ErrorHandler/error";
import { logger } from "./logger/devLogger";
import { stream } from "./logger/devLogger";
import { adminRouter } from "./routes/admin.route";
import { authRouter } from "./routes/auth.route";
import { cartRouter } from "./routes/cart.route";
import { orderRouter } from "./routes/orders.route";
import { productRouter } from "./routes/product.route";
import { defineAssociations } from "./sequalize/associations";
import env from "./utils/env";
const app = express();
const port = process.env.PORT || 5000;

defineAssociations();

app.use(morgan(":method :url :status - :response-time ms", { stream }));
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:
			env.NODE_ENV === "production"
				? env.DEPLOYED_URL
				: "http://localhost:5173",
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", authRouter, productRouter, adminRouter, orderRouter);
app.use("/api/v1", cartRouter);
app.get("/", (req: Request, res: Response) => {
	res.send("hello everyone yo ho");
});

app.use(
	(err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
		const { message = "internal server error", status = 500 } = err;

		res.status(status as number).json({
			message: "Some error occured",
			error: message,
		});
		console.log("i am inside error");
		console.log(err);
		next(err);
	},
);

app.listen(port, () => {
	logger.info(`Server running on port ${port}`);
});
