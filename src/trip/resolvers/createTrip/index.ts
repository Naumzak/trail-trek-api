import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TripService } from '../../services/trip.service';
import { TripOutput } from '../../outputs/trip';
import { CreateTripInput } from '../../input/create-trip';

@Resolver()
export class CreateTripResolver {
  constructor(private readonly tripService: TripService) {}

  @Mutation(() => TripOutput)
  async createTrip(@Args('input') input: CreateTripInput): Promise<TripOutput> {
    return this.tripService.createTrip(input);
  }
}
