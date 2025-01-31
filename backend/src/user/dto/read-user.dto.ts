import { IsEmail, IsString } from 'class-validator';

export class ReadUserDto {
  @IsString()
  username: string;
}
