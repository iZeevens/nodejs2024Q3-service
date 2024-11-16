import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

class CreateAlbum {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  artistId: string | null;
}

class UpdateAlbum {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  artistId: string | null;
}

export { CreateAlbum, UpdateAlbum };
