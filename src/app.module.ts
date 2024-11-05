import { Module } from '@nestjs/common';
import UseGetController from './controllers/useGetController';
import UsePostController from './controllers/usePostController';
import CommonService from './services/commonServices';

@Module({
  imports: [],
  controllers: [UseGetController, UsePostController],
  providers: [CommonService],
})
export class AppModule {}
