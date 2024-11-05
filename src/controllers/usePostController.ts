import { Controller, Post } from '@nestjs/common';
import CommonService from 'src/services/commonServices';

@Controller()
export default class UsePostController {
  constructor(private readonly appService: CommonService) {}

  @Post('user')
  postUser(): void {
    // return this.appService.getAll('user');
  }

  @Post('track')
  postTrack(): void {
    // return this.appService.getAll('track');
  }

  @Post('artist')
  postArtist(): void {
    // return this.appService.getAll('artist');
  }

  @Post('album')
  postAlbum(): void {
    // return this.appService.getAll('album');
  }

  @Post('favs')
  postFavs(): void {
    // return this.appService.getAll('favs');
  }
}
