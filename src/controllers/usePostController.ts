import { Controller, Post, Body } from '@nestjs/common';
import { Album, Artist, Track, User } from 'src/data/types/dataTypes';
import CommonService from 'src/services/commonServices';

@Controller()
export default class UsePostController {
  constructor(private readonly appService: CommonService) {}

  @Post('user')
  postUser(@Body() body: User): number {
    return this.appService.postCommon('user', body);
  }

  @Post('track')
  postTrack(@Body() body: Track): number {
    return this.appService.postCommon('track', body);
  }

  @Post('artist')
  postArtist(@Body() body: Artist): number {
    return this.appService.postCommon('artist', body);
  }

  @Post('album')
  postAlbum(@Body() body: Album): number {
    return this.appService.postCommon('album', body);
  }

  @Post('favs')
  postFavs(): void {
    // return this.appService.getAll('favs');
  }
}
