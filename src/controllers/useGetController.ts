import { Controller, Get } from '@nestjs/common';
import CommonService from 'src/services/commonServices';

@Controller()
export default class UseController {
  constructor(private readonly appService: CommonService) {}

  @Get('user')
  getUsers(): Array<object> {
    return this.appService.getAll('user');
  }

  @Get('track')
  getTracks(): Array<object> {
    return this.appService.getAll('track');
  }

  @Get('artist')
  getArtists(): Array<object> {
    return this.appService.getAll('artist');
  }

  @Get('album')
  getAlbums(): Array<object> {
    return this.appService.getAll('album');
  }

  @Get('favs')
  getFavs(): Array<object> {
    return this.appService.getAll('favs');
  }
}
