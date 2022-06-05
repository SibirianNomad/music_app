import { ApiProperty } from '@nestjs/swagger';

export default class CreateAlbumDto {
  @ApiProperty()
  readonly name;
  @ApiProperty()
  readonly author;
}
