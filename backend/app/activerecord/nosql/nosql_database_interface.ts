import { DatabaseInterface } from '../../../database/database_interface';

export interface NoSQLDatabaseInterface<T> extends DatabaseInterface<T> {
    // Specific methods for NoSQL databases
    aggregate(pipeline: any[]): Promise<any>;
    index(keys: string[]): Promise<void>;
}
