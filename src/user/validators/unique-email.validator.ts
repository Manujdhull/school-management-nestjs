import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepoService } from '../services/user-repo.service';

@ValidatorConstraint({ name: 'IsUniqueEmail', async: true })
@Injectable()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepo: UserRepoService) {}

  /**
   * Default error message
   * @param validationArguments
   */
  public defaultMessage(validationArguments?: ValidationArguments): string {
    return `The email ${validationArguments.value} already exists`;
  }

  /**
   * Checks if the email exists then returns false else true
   * @param email
   */
  public async validate(email: string | undefined | null): Promise<boolean> {
    if (email === undefined || email === null) {
      return true;
    }
    return this.userRepo.findByEmail(email).then((result) => !result);
  }
}

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      propertyName,
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: UniqueEmailValidator,
    });
  };
}
