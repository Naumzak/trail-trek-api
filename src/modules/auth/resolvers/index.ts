import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { LoginInput } from '../inputs/login';
import { RegisterInput } from '../inputs/register';
import { LoginOutput } from '../outputs/login';
import { RegisterOutput } from '../outputs/register';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginOutput)
  async login(@Args('input') input: LoginInput): Promise<LoginOutput> {
    return this.authService.login(input);
  }

  @Mutation(() => RegisterOutput)
  async register(@Args('input') input: RegisterInput): Promise<RegisterOutput> {
    return this.authService.register(input);
  }
}
