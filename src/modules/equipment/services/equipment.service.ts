import { Injectable } from '@nestjs/common';
import { EquipmentDao } from '../dao';

@Injectable()
export class EquipmentService {
  constructor(private readonly equipmentDao: EquipmentDao) {}

  createEquipment({ name, description, category, cost }) {
    this.equipmentDao.create({
      name,
      description,
      category,
      cost,
    });
  }

  getEquipment({ id }) {
    return this.equipmentDao.findOne({ where: { id } });
  }
}
