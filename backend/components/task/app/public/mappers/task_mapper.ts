
import { ITaskModelDocument } from "../../models/task_model";
import { TaskEntity } from "../entities/task_entity";
import { FractalMapper } from "./../../../../../app/public/mappers/fractal_mapper";


export class TaskMapper implements FractalMapper<ITaskModelDocument, TaskEntity> {
  fromModel(task: ITaskModelDocument): TaskEntity {
    return new TaskEntity(
      task.name,
      task.description
    );
  }
}
