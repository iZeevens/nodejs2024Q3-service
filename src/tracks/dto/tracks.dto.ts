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

  @IsString()
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  artistId: string | null;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  albumId: string | null;

  @IsNumber()
  @IsOptional()
  duration: number;
}

export { CreateTrackDto, UpdateTrackDto };
