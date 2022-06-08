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
import CreateCommentDto from './dto/create-comment.dto';
import UpdateTrackDto from './dto/update-track.dto';
import { TrackService } from './track.service';
import { ObjectId } from 'mongoose';
import { UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger';

@ApiTags('tracks')
@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  @ApiBody({ type: [CreateTrackDto] })
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const { audio, picture } = files;
    return this.trackService.create(dto, picture[0], audio[0]);
  }

  @ApiQuery({ name: 'count', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAll(count, offset);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.trackService.search(query);
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }

  @Patch(':id')
  @ApiBody({ type: [UpdateTrackDto] })
  update(@Param('id') id: ObjectId, @Body() dto: UpdateTrackDto) {
    return this.trackService.update(id, dto);
  }

  @Post('/comment')
  @ApiBody({ type: [CreateCommentDto] })
  createComment(@Body() dto: CreateCommentDto) {
    return this.trackService.createComment(dto);
  }

  @ApiParam({ name: 'id', description: 'Track id' })
  @Get('/listen/:id')
  createListen(@Param('id') id: ObjectId) {
    return this.trackService.createListen(id);
  }
}
