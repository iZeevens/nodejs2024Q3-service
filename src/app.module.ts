import { Module } from '@nestjs/common';
import UseGetController from './controllers/useGetController';
import UsePostController from './controllers/usePostController';
import getService from './services/getService';

@Module({
  imports: [],
  controllers: [UseGetController, UsePostController],
  providers: [getService],
})
export class AppModule {}
