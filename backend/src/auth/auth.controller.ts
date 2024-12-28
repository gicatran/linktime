import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDto } from '../account/dto/create-account.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.authService.registerAccount(createAccountDto);
  }
}
