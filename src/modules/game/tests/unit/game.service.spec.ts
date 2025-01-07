import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '../../services/game.service';
import { UserGameService } from '../../services/user-game.service';
import { GameDao } from '../../dao/game';
import { GameEntity } from '../../entities/game.entity';

const mockGame: GameEntity = {
  id: '1',
  name: 'Test Game',
  connectionString: '123',
  userGames: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('GameService', () => {
  let gameService: GameService;
  let gameDao: jest.Mocked<GameDao>;
  let userGameService: jest.Mocked<UserGameService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: GameDao,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: UserGameService,
          useValue: {
            addUserToGame: jest.fn(),
          },
        },
      ],
    }).compile();

    gameService = module.get<GameService>(GameService);
    gameDao = module.get(GameDao);
    userGameService = module.get(UserGameService);
  });

  it('should create a game and add user to it', async () => {
    const mockInput = { name: 'Test Game', userId: 'user123' };

    gameDao.create.mockReturnValue(mockGame);
    gameDao.save.mockResolvedValue(mockGame);
    userGameService.addUserToGame.mockResolvedValue(null);

    const result = await gameService.createGame(mockInput);

    expect(gameDao.create).toHaveBeenCalledWith({ name: 'Test Game' });
    expect(gameDao.save).toHaveBeenCalledWith(mockGame);
    expect(userGameService.addUserToGame).toHaveBeenCalledWith({
      connectionString: '123',
      userId: 'user123',
    });
    expect(result).toEqual(mockGame);
  });

  it('should get games for a user', async () => {
    const mockGames = [mockGame];

    gameDao.find.mockResolvedValue(mockGames);

    const result = await gameService.getGames({ userId: 'user123' });

    expect(gameDao.find).toHaveBeenCalledWith({
      relations: ['userGames'],
      where: { userGames: { userId: 'user123' } },
    });
    expect(result).toEqual(mockGames);
  });
});
