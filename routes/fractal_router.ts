import { NextFunction } from "express-serve-static-core";
import * as appRoot from "app-root-path";

import { FractalJs } from "../app";
import { FractalHome } from "./fractal_home_route";

export class FractalRouter {
  public fractalJs!: FractalJs;

  constructor(fractalJs: FractalJs) {
    this.fractalJs = fractalJs;
    // Add API routes
    new FractalHome(fractalJs.express);

    this.fractalJs.express.all(
      "/*", async (req: any, res: any, next: NextFunction) => {
        // Add react-router rotures here so that express does not logout

        // TODO: this should be automated so that the public routes are read
        // from react routes
        if (
          req.path.startsWith("/signin") ||
          req.path.startsWith("/signup") ||
          req.path.startsWith("/dashboard") ||
          req.path.startsWith("/permissions") ||
          req.path.startsWith("/roles") ||
          req.path.startsWith("/users") ||
          req.path.startsWith("/profile")
        ) {
          // Else redirect from express to the react public app
          return res.sendFile(`${appRoot}/public/index.html`);
        }
        // Most likely just handle the 404 here
        next();
      });
  }
}
