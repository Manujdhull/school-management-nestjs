'use strict';

import { STRING } from 'sequelize';
import { QueryInterface, Sequelize } from 'sequelize';
import { DataType } from 'sequelize-typescript';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('schools', {
      id: {
        type: DataType.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      logo: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null
      },
      location: {
        type: STRING,
        allowNull: false,
      },
      school_mobile_number: {
        type: DataType.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('NOW()'),
      },
      updated_at: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('NOW()'),
      },
    })
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('schools');
  },
};
