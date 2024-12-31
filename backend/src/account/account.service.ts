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
        email: account.email,
        password: hashedPassword,
        users: {
          create: {
            username: account.email.split('@')[0],
            name: account.name,
          },
        },
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.accounts.findUnique({
      where: { email },
    });
  }
}
