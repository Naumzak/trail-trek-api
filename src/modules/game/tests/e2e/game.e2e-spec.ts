import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../app.module';
import { AuthService } from '../../../auth/services/auth.service';
import { GameOutput } from '../../outputs/game';
import { register } from '../../../../../test-e2e/utils/register';
import { login } from '../../../../../test-e2e/utils/login';

describe('GameResolver (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  let accessToken: string;
  let game: GameOutput;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
    await register(authService);
    const authResponse = await login(authService);
    accessToken = authResponse.accessToken;
  }, 2000000);

  afterAll(async () => {
    await app.close();
  });

  it('should create a new game', async () => {
    const createGameMutation = `
      mutation CreateGame($input: CreateGameInput!) {
        createGame(input: $input) {
          id
          name
          connectionString
        }
      }
    `;

    const variables = {
      input: {
        name: 'Test Game',
      },
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: createGameMutation,
        variables,
      });

    expect(response.status).toBe(200);
    const createdGame = response.body.data.createGame;
    expect(createdGame).toMatchObject({
      name: 'Test Game',
    });
    game = createdGame;
  });

  it('should retrieve games for the user', async () => {
    const getGamesQuery = `
      query {
        games {
          id
          name
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ query: getGamesQuery });

    expect(response.status).toBe(200);
    expect(response.body.data.games).toBeInstanceOf(Array);
  });

  it('should trigger subscription when user connects to a game', async () => {
    const connectToGameMutation = `
      mutation ConnectToGame($input: ConnectToGameInput!) {
        connectToGame(input: $input) {
          userId
          characterId
        }
      }
    `;

    const variables = {
      input: {
        gameId: game.id,
        characterId: '0c30387f-5f18-4eba-8067-fb85fbc9b847',
      },
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: connectToGameMutation,
        variables,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.connectToGame).toBeInstanceOf(Array);
  });
});
