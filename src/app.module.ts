import { Module } from '@nestjs/common';
import UseController from './controllers/useControllers';
import CommonService from './services/commonServices';

@Module({
  imports: [],
  controllers: [UseController],
  providers: [CommonService],
})
export class AppModule {}
