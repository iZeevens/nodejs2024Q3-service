import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Artist } from 'src/artists/entities/artist.entity';

class CreateAlbum {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  artistId: Artist | null;
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
  artistId: Artist | null;
}

export { CreateAlbum, UpdateAlbum };
