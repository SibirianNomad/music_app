import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import CreateTrackDto from './dto/create-track.dto';
import CreateTCommentDto from './dto/create-comment.dto';
import UpdateTrackDto from './dto/update-track.dto';
import { TrackService } from './track.service';
import { ObjectId } from 'mongoose';
import { UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const { audio, picture } = files;
    return this.trackService.create(dto, picture[0], audio[0]);
  }

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAll(count, offset);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.trackService.search(query);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() dto: UpdateTrackDto) {
    return this.trackService.update(id, dto);
  }

  @Post('/comment')
  createComment(@Body() dto: CreateTCommentDto) {
    return this.trackService.createComment(dto);
  }

  @Get('/listen/:id')
  createListen(@Param('id') id: ObjectId) {
    return this.trackService.createListen(id);
  }
}
