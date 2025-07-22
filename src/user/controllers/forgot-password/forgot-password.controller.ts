import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Session as SessionDecorator,
  UseInterceptors,
} from '@nestjs/common';
import { Session } from 'express-session';
import { SessionErrorValidationInterceptor } from '../../../session-manager/interceptors/session-error-validation/session-error-validation.interceptor';
import { OldInputsInterceptor } from '../../../session-manager/interceptors/old-inputs/old-inputs.interceptor';
import { ApiExcludeController, ApiOkResponse } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { FrontendAppConfig } from '../../../environment/environment-types.interface';
import { AppendFormActionHeaderInterceptor } from '../../../auth/interceptors/append-form-action-header/append-form-action-header.interceptor';
import { UserRepoService } from '../../services/user-repo.service';
import { ForgetPasswordService } from '../../services/forget-password/forget-password.service';
import { ForgotPasswordDto } from '../../resources/Forgot-password.dto';

@ApiExcludeController()
@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(
    public userRepoService: UserRepoService,
    public forgotPasswordService: ForgetPasswordService,
    public configService: ConfigService,
  ) { }

  @Render('forgot-password/get-email')
  @UseInterceptors(
    SessionErrorValidationInterceptor,
    OldInputsInterceptor,
    AppendFormActionHeaderInterceptor,
  )
  @Get()
  public showForgotPassword() {
    return {
      frontendAppUrl:
        this.configService.get<FrontendAppConfig>('frontendApp').url,
    };
  }

  @Redirect('/reset-email')
  @UseInterceptors(SessionErrorValidationInterceptor, OldInputsInterceptor)
  @Post()
  public async getEmail(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @SessionDecorator() session: Session,
  ) {
    (session as any).resendEmail = forgotPasswordDto.email;
    await new Promise((res) => session.save(() => res(true)));
    await this.forgotPasswordService.sendEmail(forgotPasswordDto.email);
  }
}
