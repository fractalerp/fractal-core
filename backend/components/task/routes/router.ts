import { NextFunction } from "express-serve-static-core";

import { TasksHomeRoute } from "../routes/tasks_home_route";
import { TasksRoute } from "../routes/tasks_route";
import { FractalApp } from "../../../app";

export class TaskRouter {
  public fractalApp!: FractalApp;

  constructor(fractalApp: FractalApp) {
    this.fractalApp = fractalApp;
    // white list public routes
    this.allowPublicRoutes();
    // Add routes
    new TasksHomeRoute(fractalApp);
    new TasksRoute(fractalApp);
  }

  private allowPublicRoutes() {
    this.fractalApp.express.all(
      `${process.env.API_BASE}tasks/*`, async (_req: any, _res: any, _next: NextFunction) => {
        // Add public routes not to authenticate
        // await this.authenticateApi(this.fractalApp, req, res, next);
      });
  }
}
