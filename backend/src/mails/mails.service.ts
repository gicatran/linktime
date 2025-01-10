import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { MailerService } from 'src/mailer/mailer.service';
import { hash } from 'argon2';

@Injectable()
export class MailsService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly accountService: AccountService,
  ) {}

  async forgotPassword(mailData: {
    to: string;
    data: {
      token: string;
      accountId: number;
      email: string;
    };
  }): Promise<void> {
    const hashedToken = await hash(mailData.data.token);

    await this.accountService.updatePasswordResetToken(
      mailData.data.accountId,
      hashedToken,
    );

    return await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'Reset Password',
      templatePath: 'src/mails/templates/reset-password.hbs',
      context: {
        email: mailData.data.email,
        resetToken: mailData.data.token,
      },
    });
  }
}
