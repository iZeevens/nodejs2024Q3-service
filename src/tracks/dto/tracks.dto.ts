import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

class CreateTrackDto {
  @IsString()
  name: string;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;

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
  artistId: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @IsOptional()
  albumId: string | null;

  @IsNumber()
  @IsOptional()
  duration: number;
}

export { CreateTrackDto, UpdateTrackDto };
