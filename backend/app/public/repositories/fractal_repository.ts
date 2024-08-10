export interface FractalRepository<Entity> {
  create(dto: any): Promise<Entity>;
  read(dto: any): Promise<Entity | Entity[]>;
  update(dto: any): Promise<Entity>;
  delete(dto: any): void;
}
