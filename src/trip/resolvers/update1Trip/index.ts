import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TripService } from '../../services/trip.service';
import { TripOutput } from '../../outputs/trip';
import { UpdateTripInput } from '../../input/update-trip';

@Resolver()
export class UpdateTripResolver {
  constructor(private readonly tripService: TripService) {}

  @Mutation(() => TripOutput)
  async updateTrip(@Args('input') input: UpdateTripInput): Promise<TripOutput> {
    return this.tripService.updateTrip(input);
  }
}
