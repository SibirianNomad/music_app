import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateCommentDto {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly text: string;
  @ApiProperty()
  readonly trackId: ObjectId;
}
