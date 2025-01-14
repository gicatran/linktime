import { Injectable, Logger } from '@nestjs/common';
import { compile } from 'handlebars';
import { readFile } from 'node:fs/promises';
import { createTransport, SendMailOptions, Transporter } from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
      debug: true,
      logger: true,
    });
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: SendMailOptions & {
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined;
    if (templatePath) {
      const template = await readFile(templatePath, 'utf8');
      html = compile(template, {
        strict: true,
      })(context);
    }

    return this.transporter.sendMail(
      {
        ...mailOptions,
        from: mailOptions.from
          ? mailOptions.from
          : `"${process.env.MAILER_DEFAULT_NAME}" <${process.env.MAILER_DEFAULT_EMAIL}>`,
        html: mailOptions.html ? mailOptions.html : html,
      },
      (error, info) => {
        if (error) {
          return error;
        } else {
          return info.response;
        }
      },
    );
  }
}
