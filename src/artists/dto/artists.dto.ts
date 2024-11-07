import { IsBoolean, IsOptional, IsString } from 'class-validator';

class CreateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}

class UpdateArtistDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  grammy: boolean;
}

export { CreateArtistDto, UpdateArtistDto };
