import { config } from "dotenv";
import { num, str, cleanEnv, bool } from "envalid";

config()

const Env = cleanEnv(process.env, {
  SERVER_PORT: num(),
  MONGO_URI: str(),
  MONGO_DB: str(),
  PLANETS_FILE_PATH: str(),
  PLANETS_BATCH_SIZE: num(),
  TOKEN: str()
});

export default Env;
