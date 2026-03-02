import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';  // ← nuevo
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DteModule } from './dte/dte.module';
import { DteEntity } from './dte/entities/dte.entity';

@Module({
  imports: [
    // Carga .env automáticamente (busca .env, .env.local, etc.)
    ConfigModule.forRoot({
      isGlobal: true,  // para que ConfigService esté disponible en todo el app
      envFilePath: process.env.NODE_ENV === 'production' ? undefined : '.env',  // en prod Railway no necesita .env
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],  // inyecta ConfigService
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // Prioridad: si existe DATABASE_URL (Railway la pone), úsala
        const dbUrl = configService.get<string>('DATABASE_URL');

        if (dbUrl) {
          // En producción (Railway)
          return {
            type: 'mysql' as const,
            url: dbUrl,
            entities: [DteEntity],
            synchronize: true,  // ¡Importante! En prod NO uses true
            // logging: true,  // descomenta para debug
          };
        }

        // En local (desarrollo)
        return {
          type: 'mysql' as const,
          host: configService.get<string>('DB_HOST') || 'localhost',
          port: configService.get<number>('DB_PORT') || 3306,
          username: configService.get<string>('DB_USER') || 'root',
          password: configService.get<string>('DB_PASSWORD') || '',
          database: configService.get<string>('DB_NAME') || 'facturacion',
          entities: [DteEntity],
          synchronize: true,  // OK en local para desarrollo rápido
          // logging: true,
        };
      },
    }),

    DteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}