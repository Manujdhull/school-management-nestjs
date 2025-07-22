'use strict';

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

    await queryInterface.createTable('classrooms', {
      id: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      section_id: {
        type: DataType.BIGINT,
        allowNull: false,
        unique: true
      },
      class_id: {
        type: DataType.BIGINT,
        allowNull: false,
        unique: true
      },
      teacher_id: {
        type: DataType.BIGINT,
        allowNull: false,
        unique: true
      },
      subject_id: {
        type: DataType.BIGINT,
        allowNull: false,
        unique: true
      },
      created_at: {
        type: DataType.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataType.DATE,
        allowNull: false,
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
  },
};
