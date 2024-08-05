import { DatabaseInterface } from "../../../database/database_interface";

export interface RelationalDatabaseInterface<T> extends DatabaseInterface<T> {
    // Specific methods for relational databases
    query(sql: string, params?: any[]): Promise<any>;
    beginTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
}
