import { Injectable } from '@nestjs/common';
import { CharacterClassDao } from '../dao/characterClass';
import { ClassEntity } from '../entities/class.entity';

@Injectable()
export class CharacterClassService {
  constructor(private readonly characterClassDao: CharacterClassDao) {}

  async getClasses(): Promise<ClassEntity[]> {
    const classEntities = await this.characterClassDao.find();
    return classEntities;
  }

  async getCharacterClassById(id: string): Promise<ClassEntity> {
    const characterClassEntity = await this.characterClassDao.findOneBy({ id });
    return characterClassEntity;
  }
}
