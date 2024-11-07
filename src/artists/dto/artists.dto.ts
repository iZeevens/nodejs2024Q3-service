import { IsBoolean, IsString } from 'class-validator';

class createArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}

export { createArtistDto };
