import { Injectable } from '@nestjs/common';
import { TripDao } from '../dao/trip';
import { TripEntity } from '../entities/trip.entity';
import { ICreateTripParams } from '../interfaces/create-trip-params';
import { IDeleteTripParams } from '../interfaces/delete-trip-params';
import { IUpdateTripParams } from '../interfaces/update-trip-params';

@Injectable()
export class TripService {
  constructor(private readonly tripDao: TripDao) {}

  async getTrips(): Promise<TripEntity[]> {
    const trips = await this.tripDao.find({});
    return trips;
  }

  async createTrip(params: ICreateTripParams): Promise<TripEntity> {
    const trip = await this.tripDao.save({
      ...params,
      userId: 'testUser',
    });
    return trip;
  }

  async deleteTrip(params: IDeleteTripParams): Promise<TripEntity> {
    const trip = await this.tripDao.findOneBy({ ...params });
    const removedEntity = await this.tripDao.remove(trip);
    return { ...removedEntity, ...params };
  }

  async updateTrip({ id, ...params }: IUpdateTripParams): Promise<TripEntity> {
    await this.tripDao.update({ id }, params);
    return this.tripDao.findOneBy({ id });
  }
}
