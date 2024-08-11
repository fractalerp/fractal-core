import * as fs from "fs";
import * as appRoot from "app-root-path";

import { fractalLogger } from "../config/logger";
import { DatabaseAdapter } from "./database_adapter";
import { MongoDB } from "./mongodb";
import { Rdms } from "./rdms";
import { DatabaseConnectionInterface } from "./database_connection_interface";

export default class DatabaseManagementSystem {
  private datbaseConfigFile = `${appRoot}/config/database.json`;
  public nosqlDB!: DatabaseConnectionInterface;
  public rdmsDB!: DatabaseConnectionInterface;

  constructor() {
    if (!fs.existsSync(this.datbaseConfigFile)) {
      fractalLogger.error("Could not find database config file");

      return;
    }
    // Set database engine by parsing the json file
    const rawData = fs.readFileSync(this.datbaseConfigFile, "utf8");
    const databaseOption = JSON.parse(rawData as any);
    const noSqLAdapter = databaseOption.nosql.adapter;
    const noSqlDatabaseUri = databaseOption.nosql.uri;
    const rdmsDatabaseUri = databaseOption.rdms.uri;

    switch (noSqLAdapter) {
      case DatabaseAdapter.MONGODB:
        const mongodb = new MongoDB(process.env[`${noSqlDatabaseUri}`] as string);
        mongodb.connect();
        this.nosqlDB = mongodb;

        break;
    }

    const rdms = new Rdms(process.env[`${rdmsDatabaseUri}`] as string);
    rdms.connect();

    this.rdmsDB = rdms;

  }
}
