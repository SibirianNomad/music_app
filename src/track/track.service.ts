import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { Comment, CommentDocument } from './schemas/comment.schema ';
import CreateTrackDto from './dto/create-track.dto';
import CreateTCommentDto from './dto/create-comment.dto';
import UpdateTrackDto from './dto/update-track.dto';
import { FileService, FileType } from '../file/file.service';
import { Album, AlbumDocument } from '../album/schemas/album.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const pictureFile = await this.fileService.createFile(
      FileType.IMAGE,
      picture,
    );
    const audioFile = await this.fileService.createFile(FileType.AUDIO, audio);

    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      picture: pictureFile,
      audio: audioFile,
    });

    const album = await this.albumModel.findById(dto.albumId);
    album.tracks.push(track.id);
    album.save();
    return track;
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel.find().skip(offset).limit(count);
    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    this.fileService.removeFile(track.audio);
    this.fileService.removeFile(track.picture);
    return track.id;
  }

  async update(id: ObjectId, dto: UpdateTrackDto) {
    const track = await this.trackModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    return track;
  }

  async createComment(dto: CreateTCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment.id);
    await track.save();
    return comment;
  }

  async createListen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }
}
