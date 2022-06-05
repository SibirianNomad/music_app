import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AlbumModule } from './album/album.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TrackModule,
    FileModule,
    AlbumModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jypjd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    ),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
  ],
})
export class AppModule {}
