import { config } from "dotenv";
import { num, str, cleanEnv } from "envalid";

config()

const ENV = cleanEnv(process.env, {
  SERVER_PORT: num(),
  MONGO_URI: str(),
  DATA_FILE_PATH: str(),
  PLANETS_BATCH_SIZE: num(),
  TOKEN: str()
});

export default ENV;
