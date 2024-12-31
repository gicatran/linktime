import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountService } from 'src/account/account.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalStrategy } from 'src/account/strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccountService, PrismaService, LocalStrategy],
})
export class AuthModule {}
