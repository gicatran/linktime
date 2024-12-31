import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAccountDto } from '../account/dto/create-account.dto';
import { AccountService } from 'src/account/account.service';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly accountService: AccountService) {}

  async registerAccount(createAccountDto: CreateAccountDto) {
    const account = await this.accountService.findByEmail(
      createAccountDto.email,
    );
    if (account) throw new ConflictException('Account already exists!');
    return this.accountService.create(createAccountDto);
  }

  async validateLocalAccount(email: string, password: string) {
    const account = await this.accountService.findByEmail(email);
    if (!account) throw new UnauthorizedException("Account doesn't exist!");
    const isPasswordMatched = await verify(account.password, password);
    if (!isPasswordMatched)
      throw new UnauthorizedException('Invalid email or password!');

    return {
      id: account.id,
      email: account.email,
    };
  }
}
