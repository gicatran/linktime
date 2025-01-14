import { IsEmail, IsString } from 'class-validator';

export class ForgotPasswordAccountDto {
  @IsString()
  @IsEmail()
  email: string;
}

export class ForgotPasswordCodeDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}
