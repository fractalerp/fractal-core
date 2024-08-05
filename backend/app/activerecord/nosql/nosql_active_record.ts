import mongoose, { Model, Schema } from 'mongoose';
import { NoSQLDatabaseInterface } from "./nosql_database_interface";

export default class NoSqlActiveRecord<T> implements NoSQLDatabaseInterface<T> {
    private model: Model<T>;

    constructor(modelName: string, schema: Schema) {
        this.model = mongoose.model<T>(modelName, schema);
    }

    async find(query: any): Promise<T[]> {
        return this.model.find(query);
    }

    async findOne(query: any): Promise<T | null> {
        return this.model.findOne(query);
    }

    async create(data: T): Promise<T> {
        const document = new this.model(data);
        // @ts-ignore: TODO work on typing to support (Document<unknown, {}, T> & { _id: ObjectId; }) | (Document<unknown, {}, T> & { _id?: unknown; } & Required<{ _id: unknown; }>)
        return document.save();
    }

    async update(id: string | number, data: Partial<T>): Promise<T> {
        // @ts-ignore: TODO work on typing to support T | null
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string | number): Promise<void> {
        await this.model.findByIdAndDelete(id);
    }

    async aggregate(pipeline: any[]): Promise<any> {
        return this.model.aggregate(pipeline);
    }

    async index(keys: string[]): Promise<void> {
        // @ts-ignore: TODO work on typing to support Model<T, {}, {}, {}, IfAny<T, any, Document<unknown, {}, T> & Require_id<T>>, any>
        await this.model.createIndex(keys);
    }
}
