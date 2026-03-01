import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DteModule } from './dte/dte.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DteEntity } from './dte/entities/dte.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',      // tu usuario
      password: '',          // tu contraseña
      database: 'facturacion', // tu base de datos
      entities: [DteEntity],
      synchronize: true,     // crea tablas automáticamente no se recomienda en produccion
    }),
    DteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}