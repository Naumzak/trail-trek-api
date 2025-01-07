import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { Size } from '../../common/enum/size';
import { Language } from '../../common/enum/language';
import { CharacterEntity } from '../../character/entities/character.entity';
import { RaceEntity } from './race.entity';

@Entity('subrace')
export class SubraceEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  speed?: number;

  @Column({
    type: 'enum',
    enum: Size,
    nullable: true,
  })
  size?: Size;

  @Column({
    type: 'enum',
    enum: Language,
    array: true,
    default: [Language.COMMON],
    nullable: true,
  })
  languages: Language[];

  @ManyToOne(() => RaceEntity, (race) => race.subraces)
  public race: SubraceEntity;

  @OneToMany(() => CharacterEntity, (character) => character.subrace, {
    cascade: true,
  })
  public subraceCharacters: CharacterEntity[];
}
