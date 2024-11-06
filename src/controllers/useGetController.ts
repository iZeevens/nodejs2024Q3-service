import { Controller, Get } from '@nestjs/common';
import getService from 'src/services/getService';
import {
  User,
  Track,
  Artist,
  Album,
  Favorites,
} from 'src/data/types/dataTypes';

@Controller()
export default class UseGetController {
  constructor(private readonly appService: getService) {}

  @Get('user')
  getUsers(): User[] {
    return this.appService.getAll('user');
  }

  @Get('track')
  getTracks(): Track[] {
    return this.appService.getAll('track');
  }

  @Get('artist')
  getArtists(): Artist[] {
    return this.appService.getAll('artist');
  }

  @Get('album')
  getAlbums(): Album[] {
    return this.appService.getAll('album');
  }

  @Get('favs')
  getFavs(): Favorites[] {
    return this.appService.getAll('favs');
  }
}
