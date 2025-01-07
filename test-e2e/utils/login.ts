import { AuthService } from '../../src/modules/auth/services/auth.service';

export const login = async (authService: AuthService) => {
  const user = {
    email: 'testUser@mail.com',
    password: 'password123',
    name: 'testUser',
  };
  return authService.login(user);
};
