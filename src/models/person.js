'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Person extends Model {
    static associate(models) {
      // define associations here if any
    }
  }
  
  Person.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Person',
    tableName: 'people'
  });

  return Person;
};
