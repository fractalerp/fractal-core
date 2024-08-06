import * as fs from "fs";
import * as appRoot from "app-root-path";
import { Sequelize } from "sequelize";
import * as mongoose from "mongoose";

import { logger } from "../config/winston";
import { DatabaseAdapter } from "./database_adapter";
import { MongoDB } from "./mongodb";

export default class Database {
  private datbaseConfigFile = `${appRoot}/config/database.yml`;
  // @ts-ignore
  private database: Sequelize | mongoose.Connection | null;

  constructor() {
    if (!fs.existsSync(this.datbaseConfigFile)) {
      // Set database engine by parsing the json file
      const rawData = fs.readFileSync(this.datbaseConfigFile, "utf8");
      const databaseOption = JSON.parse(rawData as any);
      const adapter = databaseOption.adapter;
      const databaseUrl = databaseOption.url;

      switch (adapter) {
      case DatabaseAdapter.MONGODB:
        const mongodb = new MongoDB(databaseUrl);
        mongodb.connect();

        this.database = mongodb.database;

        break;
      }

    } else {
      logger.error("Could not find database config file");
    }
  }
}
