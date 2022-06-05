import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from '../track/schemas/track.schema';
import { Album, AlbumSchema } from './schemas/album.schema';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
  ],
})
export class AlbumModule {}
