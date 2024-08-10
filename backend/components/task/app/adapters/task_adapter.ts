import { TaskEntity } from "../public/entities/task_entity";
import { FractalAdapter } from "./../../../../app/adapters/fractal_adapter";

export class TaskAdapter extends FractalAdapter {
  taskEntity: TaskEntity;

  constructor(taskEntity: TaskEntity) {
    super();
    this.taskEntity = taskEntity;
  }

  toJson = () => JSON.stringify(this.taskEntity);
}
