import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { RegisterDto } from './dto/RegisterDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, compare } from 'bcrypt';
import { LoginDto } from './dto/LoginDto';

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

    data.password = await hash(data.password, 12);
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

  /**
   * Login user
   * @param data
   */
  async login(data: LoginDto) {
    const user = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const password = data.password;
    const passwordCompare = user.password;

    const checkPassword = await compare(password, passwordCompare);
    if (checkPassword) {
      return {
        status_code: 200,
        message: 'Login successfully',
      };
    } else {
      throw new HttpException(
        'User or password not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
