import { FractalEntity } from "./../../../../../app/public/entities/fractal_entity";

export class TaskEntity extends FractalEntity {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    super();
    this.name = name;
    this.description = description;
  }
}
