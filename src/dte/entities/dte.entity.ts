import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dtes')
export class DteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  emisor: string;

  @Column()
  receptor: string;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  // 🔹 NUEVO - UUID del documento
  @Column({ unique: true })
  codigoGeneracion: string;

  // 🔹 NUEVO - Número de control estructurado
  @Column({ unique: true })
  numeroControl: string;

  // 🔹 Simulación de respuesta Hacienda
  @Column()
  selloRecepcion: string;

  @Column()
  estado: string;

  @Column({ type: 'timestamp' })
  fechaProcesamiento: Date;
}