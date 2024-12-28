import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from '../account/dto/create-account.dto';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class AuthService {
  constructor(private readonly accountService: AccountService) {}

  registerAccount(createAccountDto: CreateAccountDto) {
    const user = this.accountService.findByEmail(createAccountDto.email);
    if (user) throw new ConflictException('Account already exists!');
    return this.accountService.create(createAccountDto);
  }
}
