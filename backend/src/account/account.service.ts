import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAccountDto: CreateAccountDto) {
    const { password, ...account } = createAccountDto;
    const hashedPassword = await hash(password);
    const profilePictureURL = account.profile_picture
      ? account.profile_picture.replace(/s\d+-c/, `s300-c`)
      : `${process.env.AVATAR_API_URL}/?name=${account.name}`;

    return await this.prisma.accounts.create({
      data: {
        email: account.email,
        password: hashedPassword,
        users: {
          create: {
            username: account.username,
            name: account.name,
            profile_picture: profilePictureURL,
          },
        },
      },
    });
  }

  async findByEmailOrUsername(email?: string, username?: string) {
    return await this.prisma.accounts.findFirst({
      where: {
        OR: [
          { email },
          {
            users: {
              username: { equals: username },
            },
          },
        ],
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.accounts.findUnique({
      where: {
        email,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.accounts.findUnique({
      where: {
        id,
      },
    });
  }

  async findWithResetCode(resetCode: string) {
    return await this.prisma.accounts.findFirst({
      where: {
        password_reset_token: resetCode,
      },
    });
  }

  async updateHashedRefreshToken(
    accountId: number,
    hashedRefreshToken: string | null,
  ) {
    return await this.prisma.accounts.update({
      where: {
        id: accountId,
      },
      data: {
        hashed_refresh_token: hashedRefreshToken,
      },
    });
  }

  async updatePasswordResetToken(
    accountId: number,
    passwordResetToken: string,
  ) {
    return await this.prisma.accounts.update({
      where: {
        id: accountId,
      },
      data: {
        password_reset_token: passwordResetToken,
      },
    });
  }

  async updatePassword(id: number, password: string) {
    const hashedPassword = await hash(password);
    return await this.prisma.accounts.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
        password_reset_token: null,
      },
    });
  }
}
