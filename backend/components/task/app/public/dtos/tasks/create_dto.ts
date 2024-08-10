import { FractalDto } from "./../../../../../../app/public/dtos/fractal_dto";

export interface CreateDto extends FractalDto {
  name: string;
  description: string;
}
