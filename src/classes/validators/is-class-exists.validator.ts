import { ValidationArguments, ValidatorConstraint } from "class-validator";
import { ClassesService } from "../services/classes.service";
import { BaseValidator, ValidatorDecorator } from "../../helpers/base-validator/base-validator";

@ValidatorConstraint({ name: 'isClassExists', async: false })
export class IsClassExistsValidator extends BaseValidator {
  constructor(private classService: ClassesService) { super(); }
  public message(value: any, validationArguments?: ValidationArguments): string {
    throw new Error("Class does not exists");
  }

  public async check(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const classId = Number(value);
    return !!(await this.classService.findOne(classId));
  }
}

export const IsClassExists = ValidatorDecorator(
  IsClassExistsValidator,
)