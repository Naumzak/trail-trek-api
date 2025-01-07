import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubraceEntity } from './entities/subrace.entity';
import { SubraceService } from './services/subrace.service';
import { SubraceDao } from './dao/subrace';

@Module({
  imports: [TypeOrmModule.forFeature([SubraceEntity])],
  providers: [SubraceService, SubraceDao],
  exports: [SubraceService],
})
export class SubraceModule {}
