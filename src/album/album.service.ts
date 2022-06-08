import { Injectable } from '@nestjs/common';
import CreateAlbumDto from './dto/create-album.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from './schemas/album.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  async create(dto: CreateAlbumDto): Promise<Album> {
    const album = await this.albumModel.create(dto);
    return album;
  }

  async getAll(count = 10, offset = 0): Promise<Album[]> {
    const albums = await this.albumModel.find().skip(offset).limit(count);
    return albums;
  }

  async getOne(id: ObjectId): Promise<Album> {
    const album = await this.albumModel.findById(id).populate('tracks');
    return album;
  }
}
