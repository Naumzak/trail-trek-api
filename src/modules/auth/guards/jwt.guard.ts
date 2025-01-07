import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvKey } from '../../../constants/env-keys';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request?.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromWsContext(
    context: ExecutionContext,
  ): string | undefined {
    const ctx = GqlExecutionContext.create(context);
    const token = ctx.getContext()?.req?.connectionParams?.authToken;
    return token;
  }

  private extractTokenFromContext(
    context: ExecutionContext,
  ): string | undefined {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const [type, token] = req?.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token =
      this.extractTokenFromHeader(request) ||
      this.extractTokenFromContext(context) ||
      this.extractTokenFromWsContext(context);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const configService = new ConfigService();
      const payload = await this.jwtService.verify(token, {
        secret: configService.get(EnvKey.JWT_SECRET),
      });

      if (context.getType() === 'http') {
        request.user = payload;
      } else {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        req.user = payload;
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
