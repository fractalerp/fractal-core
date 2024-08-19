// import { createServer } from "http";
// import { parse } from "url";
import next from "next";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

import fractalJsApp from "./app";

app.prepare().then(() => {
  // createServer((req, res) => {
  //   const parsedUrl = parse(req.url!, true);
  //   handle(req, res, parsedUrl);
  // }).listen(port);

  fractalJsApp.express.get('*', (req, res) => {
    return handle(req, res)
  });

  fractalJsApp.server.listen(port, () => {

    console.log(
      `> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV
      }`,
    );
  }).on("error", (err: any) => {

    console.error(err);

  }).on("close", () => {

    console.info("Server closed");

  });
});

