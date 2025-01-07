import { UserService } from '../../user/services/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ILoginParams } from '../interfaces/login-params';
import { JwtService } from '@nestjs/jwt';
import { configService } from '../../../utils/config-service';
import { EnvKey } from '../../../constants/env-keys';
import { IRegisterParams } from '../interfaces/register-params';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(params: ILoginParams) {
    try {
      const user = await this.userService.getUser({
        email: params.email,
        password: params.password,
      });

      const accessToken = this.jwtService.sign(
        { id: user.id },
        { secret: configService.get(EnvKey.JWT_SECRET) },
      );

      return {
        accessToken,
      };
    } catch (err) {
      throw new BadRequestException('No valid user data');
    }
  }

  async register(params: IRegisterParams) {
    const user = await this.userService.createUser(params);
    return { userId: user.id };
  }
}
