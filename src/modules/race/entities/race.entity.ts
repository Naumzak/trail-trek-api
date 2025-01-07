import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { CharacterEntity } from '../../character/entities/character.entity';
import { Size } from '../../common/enum/size';
import { Language } from '../../common/enum/language';
import { SubraceEntity } from '../../subrace/entities/subrace.entity';

@Entity('race')
export class RaceEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  speed: number;

  @Column({
    type: 'enum',
    enum: Size,
    default: Size.MEDIUM,
  })
  size: Size;

  @Column({
    type: 'enum',
    enum: Language,
    array: true,
    default: [Language.COMMON],
  })
  languages: Language[];

  @OneToMany(() => CharacterEntity, (character) => character.race, {
    cascade: true,
  })
  public raceCharacters: CharacterEntity[];

  @OneToMany(() => SubraceEntity, (subrace) => subrace.race, {
    cascade: true,
  })
  public subraces: SubraceEntity[];
}
