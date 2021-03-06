import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schemas/comment.schema ';
import { Track, TrackSchema } from './schemas/track.schema';
import { Album, AlbumSchema } from './../album/schemas/album.schema';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, FileService],
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
  ],
})
export class TrackModule {}
