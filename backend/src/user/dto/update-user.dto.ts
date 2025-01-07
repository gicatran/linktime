import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  profile_picture: string;

  @IsString()
  bio: string;
}
