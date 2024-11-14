import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';

class CreateTrackDto {
  @IsString()
  name: string;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: Artist | null;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  albumId: Album | null;

  @IsNumber()
  duration: number;
}

class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @IsOptional()
  artistId: Artist | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @IsOptional()
  albumId: Album | null;

  @IsNumber()
  @IsOptional()
  duration: number;
}

export { CreateTrackDto, UpdateTrackDto };
