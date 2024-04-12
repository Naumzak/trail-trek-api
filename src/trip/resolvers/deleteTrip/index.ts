import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TripService } from '../../services/trip.service';
import { TripOutput } from '../../outputs/trip';
import { DeleteTripInput } from '../../input/delete-trip';

@Resolver()
export class DeleteTripResolver {
  constructor(private readonly tripService: TripService) {}

  @Mutation(() => TripOutput)
  async deleteTrip(@Args('input') input: DeleteTripInput): Promise<TripOutput> {
    return this.tripService.deleteTrip(input);
  }
}
