import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    TrackModule,
    FileModule,
    AlbumModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.jypjd.mongodb.net/music-platform?retryWrites=true&w=majority',
    ),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
  ],
})
export class AppModule {}
