import { Module } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@nestjs-modules/ioredis';
import { RedisService } from './services/redis.service';

@Module({
  imports: [
    NestRedisModule.forRoot({
      type: 'single',
      options: {
        host: 'localhost',
        port: 6380,
      },
    }),
  ],
  providers: [RedisService],
  exports: [NestRedisModule, RedisService],
})
export class RedisModule {}
