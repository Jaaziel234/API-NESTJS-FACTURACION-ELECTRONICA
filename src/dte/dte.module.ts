import { Module } from '@nestjs/common';
import { DteController } from './dte.controller';
import { DteService } from './dte.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DteEntity } from './entities/dte.entity';


@Module({
  imports: [TypeOrmModule.forFeature([DteEntity])],
  controllers: [DteController],
  providers: [DteService]
})
export class DteModule {}
