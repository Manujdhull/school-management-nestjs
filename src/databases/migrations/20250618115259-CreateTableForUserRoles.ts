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

    await queryInterface.createTable('user_entity_roles', {
      id: {
        type: DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: DataType.BIGINT,
        allowNull: false
      },
      role_id: {
        type: DataType.BIGINT,
        allowNull: false
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
    });

    await queryInterface.addConstraint({
      tableName: 'user_entity_roles'
    }, {
      type: 'foreign key',
      fields: ['user_id'],
      name: 'user_id_with_roles_fk',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION'
    });

    await queryInterface.addConstraint({
      tableName: 'user_entity_roles'
    }, {
      type: 'foreign key',
      fields: ['role_id'],
      name: 'role_id_with_users_fk',
      references: {
        table: 'roles',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION'
    });
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('user_entity_roles');
  },
};
