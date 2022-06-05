import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    TrackModule,
    FileModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.jypjd.mongodb.net/music-platform?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
