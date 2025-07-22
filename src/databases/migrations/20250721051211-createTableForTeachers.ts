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

    await queryInterface.createTable('teachers', {
      id: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      teacher_id: {
        type: DataType.BIGINT,
        allowNull: false,
        unique: true
      },
      phone_number: {
        type: DataType.STRING,
        allowNull: false
      },
      dob: {
        type: DataType.DATE,
        allowNull: true
      },
      gender: {
        type: DataType.ENUM('male', 'female', 'other'),
        allowNull: false
      },
      address: {
        type: DataType.STRING,
        allowNull: true
      },
      city: {
        type: DataType.STRING,
        allowNull: true,
      },
      state: {
        type: DataType.STRING,
        allowNull: true,
      },
      pincode: {
        type: DataType.STRING,
        allowNull: true,
      },
      deleted_at: {
        type: DataType.DATE,
        allowNull: true,
        defaultValue: null
      }
    });

    await queryInterface.addConstraint('teachers', {
      fields: ['teacher_id'],
      type: 'foreign key',
      name: 'user_with_teacher_id_foreign_key',
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

    await queryInterface.dropTable('teachers');
  },
};
