import { logger } from "./config/winston";
import app from "./index";

const port = process.env.PORT || 3000;

logger.info("Starting server...");

app.server.listen(port, () => {

  logger.info(`Fractal Express server listening on port ${port}.\nEnvironment: ${process.env.NODE_ENV}`);

}).on("error", (err: any) => {

  logger.error(err);

}).on("close", () => {

  logger.info("Server closed");

});
