import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAccountDto } from '../account/dto/create-account.dto';
import { AccountService } from 'src/account/account.service';
import { verify } from 'argon2';
import { AuthJWTPayload } from './types/auth-jwtPayload';
import { JwtService } from '@nestjs/jwt';
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}

  async register(createAccountDto: CreateAccountDto) {
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

  async login(accountId: number, email: string) {
    const { accessToken, refreshToken } = await this.generateToken(accountId);

    return {
      id: accountId,
      email,
      accessToken,
      refreshToken,
    };
  }

  async generateToken(accountId: number) {
    const payload: AuthJWTPayload = { sub: accountId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateJwtAccount(accountId: number) {
    const account = await this.accountService.findOne(accountId);
    if (!account) throw new UnauthorizedException('Account not found!');
    const currentAccount = { id: account.id };
    return currentAccount;
  }

  async validateRefreshToken(accountId: number) {
    const account = await this.accountService.findOne(accountId);
    if (!account) throw new UnauthorizedException('Account not found!');
    const currentAccount = { id: account.id };
    return currentAccount;
  }

  async refreshToken(accountId: number, email: string) {
    const { accessToken, refreshToken } = await this.generateToken(accountId);

    return {
      id: accountId,
      email,
      accessToken,
      refreshToken,
    };
  }

  async validateGoogleAccount(googleAccount: CreateAccountDto) {
    const account = await this.accountService.findByEmailOrUsername(
      googleAccount.email,
    );
    if (account) return account;
    return await this.accountService.create(googleAccount);
  }
}
