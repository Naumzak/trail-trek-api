import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserResolver } from './resolvers/user';
import { UserService } from './services/user.service';
import { UserDao } from './dao/user';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserDao, UserResolver],
  exports: [UserService],
})
export class UserModule {}
