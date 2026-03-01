import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { DteService } from './dte.service';
import { RecepcionDteDto } from './dto/recepcion-dte.dto';

@Controller('api/dte')
export class DteController {
  constructor(private readonly dteService: DteService) {}

  @Post('recepcion')
  async recibirDte(@Body() body: RecepcionDteDto) {
    return this.dteService.procesar(body);
  }

  @Get('listado')
  async listarTodos() {
    return this.dteService.obtenerTodos();
  }

  @Get(':sello')
  async obtenerPorSello(@Param('sello') sello: string) {
    const dte = await this.dteService.obtenerPorSello(sello);
    if (!dte) return { estado: 'NO ENCONTRADO', mensaje: `No se encontró DTE con sello ${sello}` };
    return dte;
  }
}