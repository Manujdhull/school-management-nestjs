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

    await queryInterface.createTable('parents', {
      id: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      parent_id: {
        type: DataType.BIGINT,
        allowNull: false,
        unique: true
      },
      phone_number: {
        type: DataType.STRING,
        allowNull: false
      },
      gender: {
        type: DataType.ENUM('male', 'female', 'other'),
        allowNull: false
      },
    });

    await queryInterface.addConstraint('parents', {
      fields: ['parent_id'],
      type: 'foreign key',
      name: 'user_with_parent_id_foreign_key',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('parents');
  },
};
