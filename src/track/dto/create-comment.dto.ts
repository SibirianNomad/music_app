import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly text: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly trackId: ObjectId;
}
