import { Inject, Injectable } from '@nestjs/common';
import { ISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { VIEW_RENDER_ENGINE } from '../../../view-engine/constants';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ViewConfig } from '../../../environment/environment-types.interface';
import * as Twig from 'twig';
import { RenderOptions } from 'twig';
import { UserModel } from '../../../databases/models/user.model';

@Injectable()
export class MailService {
  constructor(
    @Inject(VIEW_RENDER_ENGINE) private twig: typeof Twig,
    private mailer: MailerService,
    private configService: ConfigService,
  ) { }

  /**
   * Sends mail by compiling the template and sending it as body
   * @param sendMailOptions
   */
  public async sendMail(sendMailOptions: ISendMailOptions) {
    console.log("Hello from mail service");

    sendMailOptions.html = await this.fileContent(
      sendMailOptions.template,
      sendMailOptions.context,
    );
    sendMailOptions.template = undefined;
    return this.mailer.sendMail(sendMailOptions);
  }

  public async sendWelcomeEmail(user: UserModel) {
    return this.sendMail({
      to: user.email,
      subject: 'Welcome to the School Management System',
      template: 'emails/welcome',
      context: {
        user,
      },
    });
  }

  /**
   * Returns content of file
   * @param fileName
   * @param contexts
   */
  public async fileContent(
    fileName: string,
    contexts: RenderOptions,
  ): Promise<string> {
    const viewPath = this.configService.get<ViewConfig>('view');
    return new Promise<string>((res, rej) => {
      this.twig.renderFile(
        join(viewPath.viewPath, `${fileName}.twig`),
        contexts,
        (err, result) => {
          if (err) {
            rej(err);
            return;
          }

          res(result);
        },
      );
    });
  }
}
