import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentEntity } from './entities/equipment.entity';
import { EquipmentDao } from './dao';
import { EquipmentService } from './services/equipment.service';

@Module({
  imports: [TypeOrmModule.forFeature([EquipmentEntity])],
  providers: [EquipmentDao, EquipmentService],
  exports: [EquipmentService],
})
export class EquipmentModule {}
