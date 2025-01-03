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
    const accountByUsername = await this.accountService.findByEmailOrUsername(
      createAccountDto.username,
      createAccountDto.email,
    );
    if (accountByUsername)
      throw new ConflictException(
        'An account with this username or email is already exists!',
      );

    return this.accountService.create(createAccountDto);
  }

  async validateLocalAccount(email: string, password: string) {
    const account = await this.accountService.findByEmailOrUsername(email);
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
