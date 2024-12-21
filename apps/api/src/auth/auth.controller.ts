import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDto } from '../account/dto/create-account.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signUpAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.authService.signUp(createAccountDto);
  }
}
