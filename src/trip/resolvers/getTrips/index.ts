import { Query, Resolver } from '@nestjs/graphql';
import { TripOutput } from '../../outputs/trip';
import { TripService } from '../../services/trip.service';

@Resolver()
export class GetTripsResolver {
  constructor(private readonly tripService: TripService) {}

  @Query(() => [TripOutput], { name: 'trips' })
  async getTrips(): Promise<TripOutput[]> {
    return this.tripService.getTrips();
  }
}
