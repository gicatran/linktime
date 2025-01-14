import {
  ConflictException,
  Inject,
  Injectable,
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
import { MailsService } from 'src/mails/mails.service';
import {
  ForgotPasswordAccountDto,
  ForgotPasswordCodeDto,
} from 'src/account/dto/read-account.dto';
import { ResetPasswordDto } from 'src/account/dto/update-account.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailsService: MailsService,
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

  async forgotPassword(forgotPasswordAccountDto: ForgotPasswordAccountDto) {
    const account = await this.accountService.findByEmailOrUsername(
      forgotPasswordAccountDto.email,
    );
    if (!account) throw new UnauthorizedException("Account doesn't exist!");
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    return await this.mailsService.forgotPassword({
      to: forgotPasswordAccountDto.email,
      data: {
        token: resetToken,
        accountId: account.id,
        email: account.email,
      },
    });
  }

  async forgotPasswordCode(forgotPasswordCodeDto: ForgotPasswordCodeDto) {
    const account = await this.accountService.findByEmailOrUsername(
      forgotPasswordCodeDto.email,
    );
    if (!account) throw new UnauthorizedException("Account doesn't exist!");
    const isTokenMatched = await verify(
      account.password_reset_token,
      forgotPasswordCodeDto.code,
    );
    if (!isTokenMatched) throw new UnauthorizedException('Invalid code!');
    return {
      id: account.id,
      email: account.email,
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const account = await this.accountService.findByEmailOrUsername(
      resetPasswordDto.email,
    );
    if (!account) throw new UnauthorizedException("Account doesn't exist!");
    return this.accountService.updatePassword(
      account.id,
      resetPasswordDto.password,
    );
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
