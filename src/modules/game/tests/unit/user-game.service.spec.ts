import { Test, TestingModule } from '@nestjs/testing';
import { UserGameService } from '../../services/user-game.service';
import { GameDao } from '../../dao/game';
import { UserGameDao } from '../../dao/user-game';
import { UserEntity } from '../../../user/entities/user.entity';

const mockUser: UserEntity = {
  id: '1',
  email: 'test@mail.com',
  name: '',
  password: '',
  userGames: [],
  userCharacters: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockGame: any = {
  id: '1',
  name: 'Test Game',
  connectionString: '123',
  userGames: [{ userId: 'user122', user: mockUser }],
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('UserGameService', () => {
  let userGameService: UserGameService;
  let userGameDao: jest.Mocked<UserGameDao>;
  let gameDao: jest.Mocked<GameDao>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserGameService,
        {
          provide: UserGameDao,
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: GameDao,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userGameService = module.get<UserGameService>(UserGameService);
    userGameDao = module.get(UserGameDao);
    gameDao = module.get(GameDao);
  });

  it('should add a user to a game', async () => {
    const mockDate = new Date();
    gameDao.findOne.mockResolvedValue(mockGame);
    userGameDao.save.mockResolvedValue({
      id: '1',
      userId: 'user123',
      gameId: '1',
      game: mockGame,
      createdAt: mockDate,
      updatedAt: mockDate,
      user: mockUser,
    });
    userGameDao.findOne.mockResolvedValue({
      id: '1',
      userId: 'user123',
      game: mockGame,
      user: mockUser,
      gameId: '1',
      createdAt: mockDate,
      updatedAt: mockDate,
    });

    const result = await userGameService.addUserToGame({
      userId: 'user123',
      connectionString: '123',
    });

    expect(gameDao.findOne).toHaveBeenCalledWith({
      relations: ['userGames'],
      where: { connectionString: '123' },
    });
    expect(userGameDao.save).toHaveBeenCalledWith({
      userId: 'user123',
      gameId: '1',
    });
    expect(result).toEqual({
      id: '1',
      userId: 'user123',
      gameId: '1',
      user: mockUser,
      game: mockGame,
      createdAt: mockDate,
      updatedAt: mockDate,
    });
  });

  it('should throw ConflictException if user already in game', async () => {
    gameDao.findOne.mockResolvedValue(mockGame);

    await expect(
      userGameService.addUserToGame({
        userId: 'user122',
        connectionString: '123',
      }),
    ).rejects.toThrowError('User is already in this game');
  });
});
