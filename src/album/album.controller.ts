import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CreateAlbumDto from './dto/create-album.dto';
import { AlbumService } from './album.service';
import { ObjectId } from 'mongoose';

@Controller('/albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.albumService.getOne(id);
  }

  @Post()
  create(@Body() dto: CreateAlbumDto) {
    return this.albumService.create(dto);
  }
}
