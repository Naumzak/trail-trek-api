import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripEntity } from '../entities/trip.entity';

@Injectable()
export class TripDao extends Repository<TripEntity> {
  constructor(
    @InjectRepository(TripEntity) repository: Repository<TripEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
