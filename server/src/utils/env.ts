import "./config";
import { ProcessEnvSchema } from "./types";

const env = ProcessEnvSchema.parse(process.env);
export default env;
