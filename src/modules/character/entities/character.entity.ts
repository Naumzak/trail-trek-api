import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { BaseEntity } from '../../common/entity/base.entity';
import { ClassEntity } from '../../class/entities/class.entity';
import { RaceEntity } from '../../race/entities/race.entity';
import { EquipmentEntity } from '../../equipment/entities/equipment.entity';
import { SubraceEntity } from '../../subrace/entities/subrace.entity';

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

  @JoinTable({
    name: 'character_equipments',
    joinColumn: { name: 'character_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'equipment_id', referencedColumnName: 'id' },
  })
  equipments: EquipmentEntity[];
}