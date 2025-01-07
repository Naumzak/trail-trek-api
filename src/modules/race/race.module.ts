import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceEntity } from './entities/race.entity';
import { RaceService } from './services/race.service';
import { RaceDao } from './dao/race';
import { RaceResolver } from './resolvers/race';

@Module({
  imports: [TypeOrmModule.forFeature([RaceEntity])],
  providers: [RaceService, RaceDao, RaceResolver],
  exports: [RaceService],
})
export class RaceModule {}
