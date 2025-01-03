import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDto } from '../account/dto/create-account.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.authService.registerAccount(createAccountDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginAccount(@Request() req) {
    return req.user;
  }
}
