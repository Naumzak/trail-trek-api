import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterEntity } from './entities/character.entity';
import { CharacterDao } from './dao/character';
import { CharacterService } from './services/character.service';

import { RaceModule } from '../race/race.module';
import { SubraceModule } from '../subrace/subrace.module';
import { ClassModule } from '../class/class.module';
import { UserModule } from '../user/user.module';
import { CharacterResolver } from './resolvers/character';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([CharacterEntity]),
    RaceModule,
    SubraceModule,
    ClassModule,
    UserModule,
  ],
  providers: [CharacterDao, CharacterService, CharacterResolver, JwtService],
  exports: [],
})
export class CharacterModule {}
