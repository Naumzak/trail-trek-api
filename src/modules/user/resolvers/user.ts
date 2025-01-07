import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { UserOutput } from '../outputs/user';
import { GetUserInput } from '../input/get-user';
import { DeleteUserInput } from '../input/delete-user';
import { UpdateUserInput } from '../input/update-user';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserOutput], { name: 'users' })
  async getUsers(): Promise<UserOutput[]> {
    return this.userService.getUsers();
  }

  @Query(() => UserOutput, { name: 'user' })
  async getUser(@Args('input') input: GetUserInput): Promise<UserOutput> {
    return this.userService.getUser(input);
  }

  @Mutation(() => UserOutput)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<UserOutput> {
    return this.userService.updateUser(input);
  }

  @Mutation(() => UserOutput)
  async deleteUser(@Args('input') input: DeleteUserInput): Promise<UserOutput> {
    return this.userService.deleteUser(input);
  }
}
