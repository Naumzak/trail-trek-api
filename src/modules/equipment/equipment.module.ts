import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentEntity } from './entities/equipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipmentEntity])],
  providers: [],
  exports: [],
})
export class EquipmentModule {}
