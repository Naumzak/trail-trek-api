import { AuthService } from '../../src/modules/auth/services/auth.service';

export const register = async (authService: AuthService) => {
  const user = {
    email: 'testUser@mail.com',
    password: 'password123',
    name: 'testUser',
  };
  return authService.register(user);
};
