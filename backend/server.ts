import app from "./index";
import { logger } from "./config/winston";

const port = process.env.PORT || 3000;

console.error("Starting server...");
app.server.listen(port, () => {
    // tslint:disable-next-line
    console.log("Server started");
    logger.info(`Fractal Express server listening on port ${port}.\nEnvironment: ${process.env.NODE_ENV}`);
}).on("error", (err: any) => {
    console.error(err);
}).on("close", () => {
    // tslint:disable-next-line
    console.log("Server closed");
});
