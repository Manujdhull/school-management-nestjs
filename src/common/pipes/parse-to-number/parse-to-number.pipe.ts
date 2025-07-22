import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseToNumberPipe implements PipeTransform {
  /**
   * Converts string to number else throws not found exception
   * @param value
   */
  public transform(value: any): number {
    if (typeof value === 'number') {
      return value;
    }

    if (typeof value === 'string') {
      const convertedValue = parseFloat(value);

      if (!isNaN(convertedValue)) {
        return convertedValue;
      }
    }

    throw new BadRequestException(`The value (${value}) is not a valid number`);
  }
}
