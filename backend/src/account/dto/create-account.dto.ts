import { IsEmail, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
