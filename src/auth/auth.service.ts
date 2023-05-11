import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { RegisterDto } from './dto/RegisterDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, compare } from 'bcrypt';
import { LoginDto } from './dto/LoginDto';
import { JwtService } from '@nestjs/jwt';
import { JWTCONFIG } from 'src/config/configJwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

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
      const accessToken = this.generateToken({
        sub: user.id,
        name: user.name,
        email: user.email,
      });

      return {
        status_code: 200,
        message: 'Login successfully',
        access_token: accessToken,
      };
    } else {
      throw new HttpException(
        'User or password not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /**
   * User Detail
   * @param user_id
   * @returns
   */
  async profile(user_id: number) {
    const user = await this.prisma.users.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        tasks: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      status_code: 200,
      data: user,
    };
  }

  /**
   * Upload Avatar
   * @param user_id
   * @param avatar
   * @returns
   */
  async uploadAvatar(user_id: number, avatar) {
    const user = await this.prisma.users.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return {
        status_code: 200,
        message: 'User not found',
      };
    }

    const updateAvatar = await this.prisma.users.update({
      data: {
        avatar: avatar,
      },
      where: {
        id: user_id,
      },
    });

    if (updateAvatar) {
      return {
        status_code: 200,
        message: 'Upload avatar successfully uploaded',
      };
    }
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  /**
   * Generate JWT Token
   * @param payload
   * @returns
   */
  generateToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: JWTCONFIG.secret,
      expiresIn: JWTCONFIG.expired,
    });
  }
}
