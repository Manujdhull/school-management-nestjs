import { Injectable } from "@nestjs/common";
import { MailService } from "../../../mail/services/mail/mail.service";
import { HashEncryptService } from "../../../auth/services/hash-encrypt/hash-encrypt.service";
import { UserRepoService } from "../user-repo.service";
import { UrlBuilderService } from "../../../url-management/services/url-builder/url-builder.service";
import { ConfigService } from "@nestjs/config";
import { UserModel } from "../../../databases/models/user.model";
import { InviterEmailsConfig } from "../../../environment/environment-types.interface";

@Injectable()
export class ForgetPasswordService {
  constructor(
    public mailService: MailService,
    public encryptService: HashEncryptService,
    public userRepo: UserRepoService,
    public urlBuilder: UrlBuilderService,
    protected configService: ConfigService
  ) { }

  public async sendEmail(
    email: string,
    expireAfterHours: number = 24,
  ): Promise<any> {
    console.log();
    const user: UserModel = await this.userRepo.findByEmail(email);
    if (user)
      return this.mailService.sendMail({
        template: 'forgot-password/reset-password',
        context: {
          email,
          // name: user.first_name + ' ' + user.last_name,
          name: "manuj dhull",
          resetPasswordLink: this.urlBuilder.url('reset-password', {
            queryParameters: {
              token: await this.generateToken(
                // email,
                "Rubi@gmail.com",
                this.tokenExpiry(expireAfterHours),
              ),
            },
          }),
        },
        // cc: [
        //   this.configService.get<InviterEmailsConfig>('inviterEmails')
        //     .principleEmail,
        // ],
        to: "manujdhull801@gmail.com",
        subject: 'Reset Your Trusted Leader 360° Password',
      });
    return true;
  }

  public generateToken(email: string, expiryDate: Date): Promise<string> {
    return this.encryptService.encrypt(
      JSON.stringify({ email, expiry_date: expiryDate.toISOString() }),
    );
  }

  public tokenExpiry(expireAfterHours = 24): Date {
    const today = new Date();
    today.setHours(today.getHours() + expireAfterHours);
    return today;
  }
}