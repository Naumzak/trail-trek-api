import { GameService } from '../../services/game.service';
import { UserGameService } from '../../services/user-game.service';
import { Test, TestingModule } from '@nestjs/testing';
import { GameDao } from '../../dao/game';
import { UserGameDao } from '../../dao/user-game';

jest.setTimeout(10000);

describe('GameModule Integration Tests', () => {
  let gameService: GameService;
  let userGameService: UserGameService;
  let gameDao: GameDao;
  let userGameDao: UserGameDao;

  beforeEach(async () => {
    const mockGameDao = {
      create: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Game',
        connectionString: 'test-connection',
      }),
      save: jest.fn().mockResolvedValue(true),
      findOne: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Game',
        connectionString: 'test-connection',
      }),
    };

    const mockUserGameDao = {
      create: jest.fn().mockResolvedValue({
        userId: 'user123',
        gameId: '1',
      }),
      save: jest.fn().mockResolvedValue({
        id: '1',
        userId: 'user123',
        gameId: '1',
      }),
      findOne: jest.fn().mockResolvedValue({
        id: '1',
        userId: 'user123',
        gameId: '1',
        user: { id: 'user123', name: 'User' },
        game: { id: '1', name: 'Test Game' },
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        UserGameService,
        { provide: GameDao, useValue: mockGameDao },
        { provide: UserGameDao, useValue: mockUserGameDao },
      ],
    }).compile();

    gameService = module.get<GameService>(GameService);
    userGameService = module.get<UserGameService>(UserGameService);
    gameDao = module.get<GameDao>(GameDao);
    userGameDao = module.get<UserGameDao>(UserGameDao);
  });

  it('should create a game and associate user', async () => {
    const result = await gameService.createGame({
      name: 'Test',
      userId: 'user123',
    });

    expect(result).toBeDefined();
    expect(gameDao.create).toHaveBeenCalled();
    expect(gameDao.save).toHaveBeenCalled();
    expect(userGameDao.save).toHaveBeenCalled();
  });
});
