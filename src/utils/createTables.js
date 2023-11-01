import db from "../db.js";
import UserModule from "../models/user.module.js";

async function createTableIfNotExists(model) {
  try {
    const tableExists = await db
      .getQueryInterface()
      .showAllTables()
      .then((tables) => tables.includes(model.tableName));

    if (!tableExists) {
      await model.sync();
      console.log(`Table ${model.tableName} created successfully`);
    }
  } catch (error) {
    console.error(`Error creating table ${model.tableName}:`, error);
  }
}

async function createTables() {
  try {
    const models = [UserModule];

    for (const model of models) {
      await createTableIfNotExists(model);
    }

    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error creating the tables:", error);
  }
}

export default createTables;
