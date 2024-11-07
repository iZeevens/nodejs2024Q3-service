import { IsNumber, IsString, ValidateIf } from 'class-validator';

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

export { CreateTrackDto };
