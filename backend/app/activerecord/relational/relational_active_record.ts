import { Sequelize, Model, QueryTypes } from 'sequelize';

import { RelationalDatabaseInterface } from "./relational_database_interface";

export default class RelationalActiveRecord<T> implements RelationalDatabaseInterface<T> {
    private sequelize: Sequelize;
    private model: typeof Model;

    constructor(sequelize: Sequelize, model: typeof Model) {
        this.sequelize = sequelize;
        this.model = model;
    }

    async find(query: any): Promise<T[]> {
        // @ts-ignore TODO: Fix this' context of type 'typeof Model' is not assignable to method's 'this' of type 'ModelStatic<Model<{}, {}>>'
        return this.model.findAll(query);
    }

    async findOne(query: any): Promise<T | null> {
        // @ts-ignore TODO: Fix  The 'this' context of type 'typeof Model' is not assignable to method's 'this' of type 'ModelStatic<Model<{}, {}>>'.
        return this.model.findOne(query);
    }

    async create(data: T): Promise<T> {
        // @ts-ignore FIX 'T' could be instantiated with an arbitrary type which could be unrelated to 'Model<{}, {}>'
        return this.model.create(data);
    }

    async update(id: string | number, data: Partial<T>): Promise<T> {
        // @ts-ignore Fix The 'this' context of type 'typeof Model' is not assignable to method's 'this' of type 'ModelStatic<Model<{}, {}>>'.
        return this.model.update(data, { where: { id } });
    }

    async delete(id: string | number): Promise<void> {
        // @ts-ignore Fix The 'this' context of type 'typeof Model' is not assignable to method's 'this' of type 'ModelStatic<Model<{}, {}>>'
        await this.model.destroy({ where: { id } });
    }

    async query(sql: string, params?: any[]): Promise<any> {
        return this.sequelize.query(sql, { replacements: params, type: QueryTypes.RAW });
    }

    async beginTransaction(): Promise<void> {
        this.sequelize.transaction();
    }

    async commitTransaction(): Promise<void> {
        (await this.sequelize.transaction()).commit();
    }

    async rollbackTransaction(): Promise<void> {
        (await this.sequelize.transaction()).rollback();
    }
}
