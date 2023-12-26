import { config } from "dotenv";
import { num, cleanEnv } from "envalid";

config()

const ENV = cleanEnv(process.env, {
  SERVER_PORT: num()
});

export default ENV;
