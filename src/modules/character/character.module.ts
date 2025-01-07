import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { EquipmentModule } from '../equipment/equipment.module';
import Resolvers from './resolvers';
import Dao from './dao';
import Services from './services';
import Entities from './entities';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(Entities),
    RedisModule,
    UserModule,
    EquipmentModule,
  ],
  providers: [...Resolvers, ...Dao, ...Services, JwtService],
  exports: [],
})
export class CharacterModule {}
