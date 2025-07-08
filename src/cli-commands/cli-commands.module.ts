import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { RouteListService } from './commands/route-list/route-list.service';
import { MakeMigrationService } from './commands/make-migration/make-migration.service';
import { RunMigrationService } from './commands/run-migration/run-migration.service';
import { RollbackMigrationService } from './commands/rollback-migration/rollback-migration.service';
import { RefreshMigrationService } from './commands/refresh-migration/refresh-migration.service';
import { DropDatabaseService } from './commands/drop-database/drop-database.service';
import { CreateDatabaseService } from './commands/create-database/create-database.service';
import { GenerateOauthKeysService } from './commands/oauth/generate-private-keys/generate-oauth-keys.service';
import { GenerateClientService } from './commands/oauth/generate-client/generate-client.service';
import { SeederService } from './commands/seeder/seeder.service';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';
import { RolesModule } from '../roles/roles.module';
import { RolesService } from './seeders/roles/roles.service';
import { CreateSuperAdminService } from './commands/create-super-admin/create-super-admin.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CommandModule, AuthModule, CommonModule, RolesModule, UserModule],
  providers: [
    RouteListService,
    MakeMigrationService,
    RunMigrationService,
    RollbackMigrationService,
    RefreshMigrationService,
    DropDatabaseService,
    CreateDatabaseService,
    GenerateOauthKeysService,
    GenerateClientService,
    SeederService,
    RolesService,
    CreateSuperAdminService
  ],
})
export class CliCommandsModule { }
