import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    // Extraer errores del ValidationPipe
    const res = exception.getResponse() as any;
    const mensajes = res.message || ['Error de validación'];

    // Formatear al estilo Hacienda
    response.status(200).json({
      estado: 'RECHAZADO',
      errores: mensajes
    });
  }
}