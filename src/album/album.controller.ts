import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import CreateAlbumDto from './dto/create-album.dto';
import { AlbumService } from './album.service';
import { ObjectId } from 'mongoose';
import { ApiTags, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('albums')
@Controller('/albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @ApiQuery({ name: 'count', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.albumService.getAll(count, offset);
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.albumService.getOne(id);
  }

  @Post()
  @ApiBody({ type: [CreateAlbumDto] })
  create(@Body() dto: CreateAlbumDto) {
    return this.albumService.create(dto);
  }
}
