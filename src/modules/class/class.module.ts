import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';
import { CharacterClassDao } from './dao/characterClass';
import { CharacterClassService } from './services/character-class.service';
import { RaceResolver } from './resolvers/character-class';

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntity])],
  providers: [CharacterClassDao, CharacterClassService, RaceResolver],
  exports: [CharacterClassService],
})
export class ClassModule {}
