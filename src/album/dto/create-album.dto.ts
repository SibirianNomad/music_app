import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class CreateAlbumDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name;

  @ApiProperty()
  @IsNotEmpty()
  readonly author;
}
