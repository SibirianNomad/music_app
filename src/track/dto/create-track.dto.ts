import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class CreateTrackDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name;

  @ApiProperty()
  @IsNotEmpty()
  readonly artist;

  @ApiProperty()
  readonly text;

  @ApiProperty()
  @IsNotEmpty()
  readonly albumId: ObjectId;
}
