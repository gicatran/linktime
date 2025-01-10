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
    const profilePictureURL = `https://api.multiavatar.com/${account.username}.png`;

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

  async findOne(id: number) {
    return await this.prisma.accounts.findUnique({
      where: {
        id,
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
}
