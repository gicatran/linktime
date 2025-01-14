import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDto } from '../account/dto/create-account.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Response } from 'express';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import {
  ForgotPasswordAccountDto,
  ForgotPasswordCodeDto,
} from 'src/account/dto/read-account.dto';
import { ResetPasswordDto } from 'src/account/dto/update-account.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() createAccountDto: CreateAccountDto) {
    return this.authService.register(createAccountDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user.id, req.user.email);
  }

  @Post('logout')
  logout(@Req() req) {
    return this.authService.logout(req.user.id);
  }

  @Public()
  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordAccountDto: ForgotPasswordAccountDto) {
    return this.authService.forgotPassword(forgotPasswordAccountDto);
  }

  @Public()
  @Post('forgot-password/code')
  forgotPasswordCode(@Body() forgotPasswordCodeDto: ForgotPasswordCodeDto) {
    return this.authService.forgotPasswordCode(forgotPasswordCodeDto);
  }

  @Public()
  @Post('forgot-password/reset')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    const response = await this.authService.login(req.user.id, req.user.email);
    res.redirect(
      `${process.env.FRONTEND_URL}/api/auth/google/callback?accountId=${response.id}&email=${response.email}&accessToken=${response.accessToken}&refreshToken=${response.refreshToken}`,
    );
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.id, req.user.email);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getUserProfile(req.user.id);
  }

  @Roles('admin')
  @Get('protected')
  getAll(@Request() req) {
    return req.user;
  }
}
