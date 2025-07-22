import { ValidationArguments, ValidatorConstraint } from "class-validator";
import { BaseValidator, ValidatorDecorator } from "../../helpers/base-validator/base-validator";
import { RoleService } from "../../roles/services/role.service";
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({ name: 'isRoleExists', async: false })
@Injectable()
export class IsRoleExistsValidator extends BaseValidator {
  constructor(private readonly roleService: RoleService) {
    super();
  }
  public message(value: any, validationArguments?: ValidationArguments): string {
    throw new Error("Registration for this role is not available");
  }
  public async check(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const role_id = Number(value);
    return !!(await this.roleService.findById(role_id));
  }
}

export const IsRoleExists = ValidatorDecorator(
  IsRoleExistsValidator,
)