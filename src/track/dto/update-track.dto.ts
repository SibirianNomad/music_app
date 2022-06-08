import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateTrackDto {
  @ApiProperty()
  readonly name;

  @ApiProperty()
  readonly artist;

  @ApiProperty()
  readonly text;

  @ApiProperty()
  readonly albumId: ObjectId;
}
