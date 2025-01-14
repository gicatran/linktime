import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MailsController } from './mails.controller';
import { MailerService } from 'src/mailer/mailer.service';
import { AccountService } from 'src/account/account.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MailsController],
  providers: [MailsService, MailerService, AccountService, PrismaService],
})
export class MailsModule {}
