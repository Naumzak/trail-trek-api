import { Injectable } from '@nestjs/common';
import { CharacterDao } from '../dao/character';
import { CharacterEntity } from '../entities/character.entity';
import { RaceService } from '../../race/services/race.service';
import { CharacterClassService } from '../../class/services/character-class.service';
import { SubraceService } from '../../subrace/services/subrace.service';
import { UserService } from '../../user/services/user.service';
import { ICreateCharacterParams } from '../interfaces/create-character-params';
import { IGetCharactersParams } from '../interfaces/get-characters-params';
import { EquipmentService } from '../../equipment/services/equipment.service';

@Injectable()
export class CharacterService {
  constructor(
    private readonly characterDao: CharacterDao,
    private readonly raceService: RaceService,
    private readonly subraceService: SubraceService,
    private readonly characterClassService: CharacterClassService,
    public readonly userService: UserService,
    public readonly equipmentService: EquipmentService,
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
}
