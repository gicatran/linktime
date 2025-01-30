import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByAccountId(accountId: number) {
    return await this.prisma.users.findUnique({
      where: {
        account_id: accountId,
      },
    });
  }

  async findByUsername(username: string) {
    return await this.prisma.users.findUnique({
      where: {
        username,
      },
    });
  }
}
