import { ObjectId } from 'mongoose';

export default class CreateTrackDto {
  readonly name;
  readonly artist;
  readonly text;
  readonly albumId: ObjectId;
}
