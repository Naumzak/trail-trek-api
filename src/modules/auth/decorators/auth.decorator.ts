import { UseGuards, applyDecorators } from '@nestjs/common';
import { JWTGuard } from '../guards/jwt.guard';

export const Auth = () => applyDecorators(UseGuards(JWTGuard));
