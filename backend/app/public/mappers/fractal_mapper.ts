export interface FractalMapper<Model, Dto> {
  fromModel(model: Model): Dto;
}
