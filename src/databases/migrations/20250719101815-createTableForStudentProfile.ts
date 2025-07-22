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

    await queryInterface.createTable('students', {
      id: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      student_id: {
        type: DataType.BIGINT,
        allowNull: false,
        unique: true,
      },
      parent_id: {
        type: DataType.BIGINT,
        allowNull: false,
        unique: false,
      },
      roll_number: {
        type: DataType.STRING,
        allowNull: false,
      },
      dob: {
        type: DataType.DATE,
        allowNull: true
      },
      created_at: {
        type: DataType.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataType.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: DataType.DATE,
        allowNull: true,
        defaultValue: null,
      }
    });

    await queryInterface.addConstraint('students', {
      fields: ['student_id'],
      type: 'foreign key',
      name: 'student_with_student_id_foreign_key',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('students', {
      fields: ['parent_id'],
      type: 'foreign key',
      name: 'student_with_parent_id_foreign_key',
      references: {
        table: 'parents',
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

    await queryInterface.dropTable('students');
  },
};
