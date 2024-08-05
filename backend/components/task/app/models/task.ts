import { ActiveModel } from "../../../../app/models/active_model"

export interface ITaskDocument {
    name: string;
    description: string;
}

const TaskSchema = {
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

export const Task = new ActiveModel<ITaskDocument>("Task", TaskSchema);

export default Task;
