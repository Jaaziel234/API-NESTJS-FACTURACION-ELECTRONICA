import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class RecepcionDteDto {
  @IsString({ message: "El campo 'emisor' debe ser texto" })
  @IsNotEmpty({ message: "El campo 'emisor' es obligatorio" })
  emisor: string;

  @IsString({ message: "El campo 'receptor' debe ser texto" })
  @IsNotEmpty({ message: "El campo 'receptor' es obligatorio" })
  receptor: string;

  @IsNumber({}, { message: "El campo 'monto' debe ser un número" })
  @IsNotEmpty({ message: "El campo 'monto' es obligatorio" })
  monto: number;
}