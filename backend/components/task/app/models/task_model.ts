import { FractalActiveModel } from "../../../../app/models/fractal_active_model";

export interface ITaskModelDocument {
  name: string;
  description: string;
}

const TaskModelSchema = {
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: null
  }
};

export const TaskModel = new FractalActiveModel<ITaskModelDocument>("Task", TaskModelSchema);
