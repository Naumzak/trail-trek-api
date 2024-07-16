import { Injectable } from '@nestjs/common';
import { CharacterDao } from '../dao/character';
import { CharacterEntity } from '../entities/character.entity';
import { RaceService } from '../../race/services/race.service';
import { CharacterClassService } from '../../class/services/character-class.service';
import { SubraceService } from '../../subrace/services/subrace.service';
import { UserService } from '../../user/services/user.service';
import { ICreateCharacterParams } from '../interfaces/create-character-params';
import { IGetCharactersParams } from '../interfaces/get-characters-params';

@Injectable()
export class CharacterService {
  constructor(
    private readonly characterDao: CharacterDao,
    private readonly raceService: RaceService,
    private readonly subraceService: SubraceService,
    private readonly characterClassService: CharacterClassService,
    public readonly userService: UserService,
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

    await this.characterDao.save(character);

    return character;
  }

  getCharacters({ userId }: IGetCharactersParams): Promise<CharacterEntity[]> {
    const characters = this.characterDao.findBy({ userId });
    return characters;
  }
}
