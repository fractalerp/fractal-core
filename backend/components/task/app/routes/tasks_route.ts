import { TasksController } from "../controllers/tasks_controller";
import { FractalApp } from "../../../../app";

export class TasksRoute {
  public tasksController!: TasksController;

  public constructor(fractalApp: FractalApp) {
    this.tasksController = new TasksController();
    const rolesEndpoint = `${process.env.API_BASE}tasks`;
    /* Get, Add tasks */
    fractalApp.express.route(`${rolesEndpoint}`)
      .get(this.tasksController.getTasks)
      .post(this.tasksController.addNewTask);

    /* Task details, update and delete */
    fractalApp.express.route(`${rolesEndpoint}/:id`)
      .get(this.tasksController.getTaskWithID)
      .put(this.tasksController.updateTask)
      .delete(this.tasksController.deleteTask);
  }
}
