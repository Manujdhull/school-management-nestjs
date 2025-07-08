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

    await queryInterface.createTable('student_class_subject', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      student_id: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      class_id: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      class_subject_id: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      section_id: {
        type: DataType.INTEGER,
        allowNull: false,
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
      },
    })

    await queryInterface.addConstraint('student_class_subject', {
      fields: ['student_id'],
      type: 'foreign key',
      name: 'student_class_subject_student_id_foreign_key',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('student_class_subject', {
      fields: ['class_id'],
      type: 'foreign key',
      name: 'student_class_subject_class_id_foreign_key',
      references: {
        table: 'classes',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('student_class_subject', {
      fields: ['class_subject_id'],
      type: 'foreign key',
      name: 'student_class_subject_class_subject_id_foreign_key',
      references: {
        table: 'subjects',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('student_class_subject', {
      fields: ['section_id'],
      type: 'foreign key',
      name: 'student_class_subject_section_id_foreign_key',
      references: {
        table: 'sections',
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

    await queryInterface.dropTable('student_class_subject');
  },
};
