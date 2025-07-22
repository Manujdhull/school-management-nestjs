import { ValidationArguments, ValidatorConstraint } from "class-validator";
import { BaseValidator, ValidatorDecorator } from "../../helpers/base-validator/base-validator";
import { SubjectService } from "../services/subject.service";

@ValidatorConstraint({ name: 'IsSchoolExists', async: false })
export class IsSubjectExistsValidator extends BaseValidator {
  constructor(private subjectService: SubjectService) { super(); }
  public message(value: any, validationArguments?: ValidationArguments): string {
    throw new Error("Subject does not exists");
  }

  public async check(value: any): Promise<boolean> {
    const classId = Number(value);
    return !!(await this.subjectService.findOne(classId));
  }
}

export const IsSchoolExists = ValidatorDecorator(
  IsSubjectExistsValidator,
)