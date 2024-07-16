import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { EquipmentCategory } from '../enum/equipmentCategory';
import { Cost } from './cost';
import { CharacterEntity } from '../../character/entities/character.entity';

@Entity('equipment')
export class EquipmentEntity extends BaseEntity {
  @Column({ unique: true, nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: EquipmentCategory,
    nullable: false,
  })
  category: EquipmentCategory;

  @Column((type) => Cost)
  cost: Cost;

  @Column()
  description: string;

  @ManyToMany(() => CharacterEntity, (character) => character.equipments)
  characters: CharacterEntity[];
}
