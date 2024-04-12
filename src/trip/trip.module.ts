import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripEntity } from './entities/trip.entity';
import { TripService } from './services/trip.service';
import { TripDao } from './dao/trip';
import { tripResolvers } from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([TripEntity])],
  providers: [TripService, TripDao, ...tripResolvers],
  exports: [],
})
export class TripModule {}
