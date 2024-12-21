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
    return await this.prisma.accounts.create({
      data: {
        password: hashedPassword,
        ...account,
        users: {
          create: {
            username: account.email.split('@')[0],
          },
        },
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
}
