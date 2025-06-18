import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  import { Injectable } from '@nestjs/common';
import { ClientRepoService } from '../../auth/services/oauth/client-repo/client-repo.service';
  
  @ValidatorConstraint({ name: 'VerifyClientCredentials', async: true })
  @Injectable()
  export class VerifyClientCredentialsValidator
    implements ValidatorConstraintInterface
  {
    constructor(private clientRepoService: ClientRepoService) {}
  
    /**
     * Default message
     */
    defaultMessage(): string {
      return 'The client credentials are incorrect';
    }
  
    /**
     * Returns true when empty or client secret empty or when client id and secret exists
     * @param clientId
     * @param validationArguments
     */
    public async validate(
      clientId: string | null | undefined,
      validationArguments: ValidationArguments,
    ): Promise<boolean> {
      if (!clientId) {
        return true;
      }
  
      const clientSecret: string | false = this.getClientSecret(
        validationArguments.object,
        validationArguments.constraints instanceof Array
          ? validationArguments.constraints[0]
          : '',
      );
  
      if (!clientSecret) {
        return true;
      }
  
      return this.clientRepoService
        .findForIdAndSecret(clientId, clientSecret)
        .then((result) => !!result);
    }
  
    /**
     * Return false when if object is not a type of object or not having propertyName
     * @param object
     * @param propertyName
     */
  
    public getClientSecret(object: any, propertyName: string): false | string {
      if (typeof object !== 'object') {
        return false;
      }
  
      if (!object.hasOwnProperty(propertyName)) {
        return false;
      }
  
      return object[propertyName];
    }
  }
  
  /**
   *
   * @param secretBodyName
   * @param validationOptions
   * @constructor
   */
  
  export function VerifyClientCredentials(
    secretBodyName: string,
    validationOptions?: ValidationOptions,
  ) {
    return (object: any, propertyName: string) => {
      registerDecorator({
        propertyName,
        target: object.constructor,
        constraints: [secretBodyName],
        options: validationOptions,
        validator: VerifyClientCredentialsValidator,
      });
    };
  }
  