import { Injectable } from '@nestjs/common';
import { RecepcionDteDto } from './dto/recepcion-dte.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DteEntity } from './entities/dte.entity';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

@Injectable()
export class DteService {
  constructor(
    @InjectRepository(DteEntity)
    private dteRepository: Repository<DteEntity>,
  ) {}

  async procesar(data: RecepcionDteDto) {
    const errores: string[] = [];

    if (!data.emisor)
      errores.push("El campo 'emisor' es obligatorio");

    if (!data.receptor)
      errores.push("El campo 'receptor' es obligatorio");

    if (data.monto == null)
      errores.push("El campo 'monto' es obligatorio y debe ser numérico");

    if (errores.length > 0) {
      return { estado: 'RECHAZADO', errores };
    }

    const codigoGeneracion = uuidv4().toUpperCase();

    const numeroControl = `DTE-01-S001P001-${Date.now()}`;

    const selloRecepcion = crypto
      .createHash('sha256')
      .update(codigoGeneracion + Date.now())
      .digest('hex')
      .toUpperCase();

    const dte = this.dteRepository.create({
      emisor: data.emisor,
      receptor: data.receptor,
      monto: data.monto,
      codigoGeneracion,
      numeroControl,
      selloRecepcion,
      estado: 'RECIBIDO',
      fechaProcesamiento: new Date(),
    });

    await this.dteRepository.save(dte);

    return dte;
  }

  async obtenerTodos() {
    return this.dteRepository.find();
  }

  async obtenerPorSello(sello: string) {
    return this.dteRepository.findOne({
      where: { selloRecepcion: sello },
    });
  }
}