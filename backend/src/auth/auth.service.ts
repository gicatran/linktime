import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAccountDto } from '../account/dto/create-account.dto';
import { AccountService } from 'src/account/account.service';
import { hash, verify } from 'argon2';
import { AuthJWTPayload } from './types/auth-jwtPayload';
import { JwtService } from '@nestjs/jwt';
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly userService: UserService,
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

  async login(accountId: number, email: string) {
    const { accessToken, refreshToken } = await this.generateToken(accountId);
    const hashedRefreshToken = await hash(refreshToken);
    await this.accountService.updateHashedRefreshToken(
      accountId,
      hashedRefreshToken,
    );
    return {
      id: accountId,
      email,
      accessToken,
      refreshToken,
    };
  }

  async logout(accountId: number) {
    return await this.accountService.updateHashedRefreshToken(accountId, null);
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

  async refreshToken(accountId: number, email: string) {
    const { accessToken, refreshToken } = await this.generateToken(accountId);
    const hashedRefreshToken = await hash(refreshToken);
    await this.accountService.updateHashedRefreshToken(
      accountId,
      hashedRefreshToken,
    );
    return {
      id: accountId,
      email,
      accessToken,
      refreshToken,
    };
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
      role: account.role,
    };
  }

  async validateJwtAccount(accountId: number) {
    const account = await this.accountService.findOne(accountId);
    if (!account) throw new UnauthorizedException('Account not found!');
    const currentAccount = { id: account.id, role: account.role };
    return currentAccount;
  }

  async validateRefreshToken(accountId: number, refreshToken: string) {
    const account = await this.accountService.findOne(accountId);
    if (!account) throw new UnauthorizedException('Account not found!');
    const refreshTokenMatched = await verify(
      account.hashed_refresh_token,
      refreshToken,
    );
    Logger.log('Refresh Token Matched: ' + refreshTokenMatched);
    if (!refreshTokenMatched)
      throw new UnauthorizedException('Invalid Refresh Token!');
    const currentAccount = { id: account.id, role: account.role };
    return currentAccount;
  }

  async validateGoogleAccount(googleAccount: CreateAccountDto) {
    const account = await this.accountService.findByEmailOrUsername(
      googleAccount.email,
    );
    if (account) return account;
    return await this.accountService.create(googleAccount);
  }

  async getUserProfile(accountId: number) {
    const user = await this.userService.findByAccountId(accountId);
    if (!user) throw new UnauthorizedException('User not found!');
    return user;
  }
}
