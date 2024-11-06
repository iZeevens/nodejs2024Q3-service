import { Controller, Post, Body, Res } from '@nestjs/common';
import { Album, Artist, Track, User } from 'src/data/types/dataTypes';
import { Response } from 'express';
import CommonService from 'src/services/commonServices';

@Controller()
export default class UsePostController {
  constructor(private readonly appService: CommonService) {}

  @Post('user')
  postUser(@Body() body: User, @Res() res: Response) {
    return this.appService.postCommon('user', body, res);
  }

  @Post('track')
  postTrack(@Body() body: Track, @Res() res: Response) {
    return this.appService.postCommon('track', body, res);
  }

  @Post('artist')
  postArtist(@Body() body: Artist, @Res() res: Response) {
    return this.appService.postCommon('artist', body, res);
  }

  @Post('album')
  postAlbum(@Body() body: Album, @Res() res: Response) {
    return this.appService.postCommon('album', body, res);
  }

  @Post('favs')
  postFavs(): void {
    // return this.appService.getAll('favs');
  }
}
