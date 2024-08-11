import { Request, Response } from "express";
import { FractalApp } from "../../../app";

export class TasksHomeRoute {
  public constructor(fractalApp: FractalApp) {
    const authEndpoint = `${process.env.API_BASE}tasks`;
    // GET endpoint
    fractalApp.express.route(authEndpoint)
      // GET endpoint
      .get((_req: Request, res: Response) => {
        // Get all contacts
        res.status(200).send({
          message: "Welcome to Fractal Task API.",
          version: "1.0.0"
        });
      });
  };
}
