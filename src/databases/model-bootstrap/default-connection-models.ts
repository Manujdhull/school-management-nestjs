import { UserModel } from '../models/user.model';
import { AccessTokenModel } from '../models/oauth/access-token.model';
import { RefreshTokenModel } from '../models/oauth/refresh-token.model';
import { ClientModel } from '../models/oauth/client.model';
import { AuthorizationChallengeModel } from '../models/oauth/authorization-challenge.model';
import { RoleModel } from '../models/role.model';
import { UserRolesModel } from '../models/user-roles.model';
import { SectionModel } from '../models/section.model';
import { ClassModel } from '../models/class.model';
import { SubjectModel } from '../models/subject.model';
import { StudentClassSubjectModel } from '../models/student-class-subject.model';

export const DefaultConnectionModels = [
  UserModel,
  ClientModel,
  AccessTokenModel,
  RefreshTokenModel,
  AuthorizationChallengeModel,
  RoleModel,
  UserRolesModel,
  SectionModel,
  ClassModel,
  SubjectModel,
  StudentClassSubjectModel
];
