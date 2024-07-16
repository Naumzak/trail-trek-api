import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { CharacterEntity } from '../../character/entities/character.entity';
import { Dice } from '../../common/enum/dice';

@Entity('class')
export class ClassEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  image: string;

  @Column({
    type: 'enum',
    enum: Dice,
    default: Dice.D8,
  })
  hitDice: Dice;

  @OneToMany(() => CharacterEntity, (character) => character.class, {
    cascade: true,
  })
  public classCharacters: CharacterEntity[];
}
