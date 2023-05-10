import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { RegisterDto } from './dto/RegisterDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  /**
   * Register new user
   * @param data
   * @returns
   */
  async register(data: RegisterDto) {
    const checkUser = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (checkUser) {
      throw new HttpException('User alredy registered', HttpStatus.FOUND);
    }

    const createUser = await this.prisma.users.create({
      data: data,
    });

    if (createUser) {
      return {
        status_code: 200,
        message: 'Register Successfully',
      };
    }
  }
}
