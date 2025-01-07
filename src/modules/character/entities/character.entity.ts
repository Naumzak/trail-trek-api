import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { BaseEntity } from '../../common/entity/base.entity';
import { EquipmentEntity } from '../../equipment/entities/equipment.entity';
import { ClassEntity } from './class.entity';
import { RaceEntity } from './race.entity';
import { SubraceEntity } from './subrace.entity';

@Entity('character')
export class CharacterEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.userCharacters, {
    nullable: false,
  })
  public user: UserEntity;

  @ManyToOne(
    () => ClassEntity,
    (characterClass) => characterClass.classCharacters,
    { nullable: false },
  )
  public class: ClassEntity;

  @ManyToOne(() => RaceEntity, (race) => race.raceCharacters, {
    nullable: false,
  })
  public race: RaceEntity;

  @ManyToOne(() => SubraceEntity, (subrace) => subrace.subraceCharacters, {
    nullable: false,
  })
  public subrace: SubraceEntity;

  @ManyToMany(() => EquipmentEntity, (equipment) => equipment.characters)
  @JoinTable({
    // name: 'character_equipments',
    // joinColumn: { name: 'character_id', referencedColumnName: 'id' },
    // inverseJoinColumn: { name: 'equipment_id', referencedColumnName: 'id' },
  })
  equipments: EquipmentEntity[];
}
