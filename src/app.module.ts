import { Module } from '@nestjs/common';
import UseGetController from './controllers/useGetController';
import UsePostController from './controllers/usePostController';
import getService from './services/getService';
import postSerivce from './services/postService';

@Module({
  imports: [],
  controllers: [UseGetController, UsePostController],
  providers: [getService, postSerivce],
})
export class AppModule {}
