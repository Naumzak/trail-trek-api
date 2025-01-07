import { Injectable } from '@nestjs/common';
import { CharacterDao } from '../dao/character';
import { CharacterEntity } from '../entities/character.entity';
import { UserService } from '../../user/services/user.service';
import { ICreateCharacterParams } from '../interfaces/create-character-params';
import { IGetCharactersParams } from '../interfaces/get-characters-params';
import { EquipmentService } from '../../equipment/services/equipment.service';
import { RaceService } from './race.service';
import { SubraceService } from './subrace.service';
import { CharacterClassService } from './character-class.service';
import { RedisService } from '../../redis/services/redis.service';
import { IGameUser } from '../../game/interfaces/game-user';
import { In } from 'typeorm';

@Injectable()
export class CharacterService {
  constructor(
    private readonly characterDao: CharacterDao,
    private readonly raceService: RaceService,
    private readonly subraceService: SubraceService,
    private readonly characterClassService: CharacterClassService,
    public readonly userService: UserService,
    public readonly equipmentService: EquipmentService,
    private readonly redisService: RedisService,
  ) {}

  async createCharacter(
    params: ICreateCharacterParams,
  ): Promise<CharacterEntity> {
    const { userId, subraceId, raceId, classId, name } = params;
    const user = await this.userService.getUser({ id: userId });
    const race = await this.raceService.getRaceById(raceId);
    const subrace = await this.subraceService.getSubraceById(subraceId);
    const characterClass =
      await this.characterClassService.getCharacterClassById(classId);

    const character = this.characterDao.create({
      name,
      user,
      race,
      subrace,
      class: characterClass,
      userId: user.id,
    });

    return this.characterDao.save(character);
  }

  getCharacters({ userId }: IGetCharactersParams): Promise<CharacterEntity[]> {
    const characters = this.characterDao.find({
      where: { userId },
      relations: ['race', 'class', 'subrace'],
    });
    return characters;
  }

  async getCharacter({ characterId }) {
    const character = await this.characterDao.findOne({
      where: { id: characterId },
      relations: ['race', 'class', 'subrace', 'equipments'],
    });
    return character;
  }

  async getCharactersByGameId({ userId, gameId }) {
    const gameData = await this.redisService.get(gameId);
    const users = gameData ? (JSON.parse(gameData) as IGameUser[]) : [];

    const charactersIds = users
      .filter((user) => user.userId !== userId)
      .map((user) => user.characterId);

    const character = await this.characterDao.find({
      where: { id: In(charactersIds) },
      relations: ['race', 'class', 'subrace', 'equipments'],
    });
    return character;
  }
}
