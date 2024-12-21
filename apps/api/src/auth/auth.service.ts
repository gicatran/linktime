import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from '../account/dto/create-account.dto';
import { AccountService } from 'src/account/account.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly accountService: AccountService) {}

  signUp(createAccountDto: CreateAccountDto) {
    const account = this.accountService.findByEmail(createAccountDto.email);
    if (account) throw new ConflictException('Account already exists');
    return this.accountService.create(createAccountDto);
  }
}
