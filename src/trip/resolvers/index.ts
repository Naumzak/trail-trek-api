import { GetTripsResolver } from './getTrips';
import { CreateTripResolver } from './createTrip';
import { DeleteTripResolver } from './deleteTrip';
import { UpdateTripResolver } from './update1Trip';

export const tripResolvers = [
  GetTripsResolver,
  CreateTripResolver,
  DeleteTripResolver,
  UpdateTripResolver,
];
