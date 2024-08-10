import { FractalDto } from "./../../../../../../app/public/dtos/fractal_dto";

export interface UpdateDto extends FractalDto {
  id: string;
  name: string;
  description: string;
}
