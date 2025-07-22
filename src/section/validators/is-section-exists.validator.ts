import { ValidationArguments, ValidatorConstraint } from "class-validator";
import { BaseValidator, ValidatorDecorator } from "../../helpers/base-validator/base-validator";
import { SectionService } from "../services/sections.service";

@ValidatorConstraint({ name: 'IsSectionExists', async: false })
export class IsSectionExistsValidator extends BaseValidator {
  constructor(private sectionService: SectionService) { super(); }
  public message(value: any, validationArguments?: ValidationArguments): string {
    throw new Error("Class does not exists");
  }

  public async check(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const classId = Number(value);
    return !!(await this.sectionService.findOne(classId));
  }
}

export const IsSectionExists = ValidatorDecorator(
  IsSectionExistsValidator,
)