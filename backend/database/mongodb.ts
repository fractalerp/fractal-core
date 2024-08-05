import mongoose from 'mongoose';
import { DatabaseConnectionInterface } from "./database_connection_interface";
import { logger } from "./../config/winston"
import { Environments } from "./../utils/constants"

export class MongoDB implements DatabaseConnectionInterface {

    private database_url: string;

    public database: mongoose.Connection | null = null;

    constructor(database_url: string) {
        this.database_url = database_url;
    }

    async connect(): Promise<void> {
        let options = {
            retryWrites: true,
            ssl: true
        };
        // set database debgu info to log file
        mongoose.set('debug', function (coll, method, query, doc, options) {
            let set = {
                coll: coll,
                method: method,
                query: query,
                doc: doc,
                options: options
            };

            logger.info({
                dbQuery: set
            });
        });

        // Do not log sensitive information in production
        if (process.env.ENVIRONMENT !== Environments.PRODUCTION) {
            mongoose.set("debug", (coll: any, method: any, query: any, doc: any, opts: any) => {
                logger.info({
                    dbQuery: {
                        coll,
                        method,
                        query,
                        doc,
                        options: opts
                    }
                });
            });
        }

        // Do not use ssl on localhost
        for (const dbHost of ["://localhost", "://127.0.0.1", "://0.0.0.0"]) {
            if (this.database_url.includes(dbHost)) {
                options = { ...options, ssl: false };
                break;
            }
        }

        this.database = mongoose.createConnection(this.database_url, options);
    }

    async disconnect(): Promise<void> {
        await mongoose.disconnect();
    }
}

