import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  nombre: string;

  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @IsString()
  telefono: string;

  @IsOptional()
  @IsEmail({}, { message: 'El formato del email no es válido' })
  email?: string;

  @IsOptional()
  @IsString()
  direccion?: string;
}
