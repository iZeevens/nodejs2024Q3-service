import { Controller, Get } from '@nestjs/common';
import CommonService from 'src/services/commonServices';

@Controller()
export default class UseController {
  constructor(private readonly appService: CommonService) {}

  @Get('user')
  findAll(): object {
    return this.appService.getAll('user');
  }
}
