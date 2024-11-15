import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';
import process from 'process';
import configFile from '../config/config.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelsDirectory = __dirname; 
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const modelFiles = fs.readdirSync(modelsDirectory)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && !file.includes('.test.js'));

for (const file of modelFiles) {
  const filePath = path.join(modelsDirectory, file);
  const fileUrl = `file://${path.resolve(filePath)}`; 

  const model = await import(fileUrl);
  db[model.default.name] = model.default(sequelize, Sequelize.DataTypes);
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
