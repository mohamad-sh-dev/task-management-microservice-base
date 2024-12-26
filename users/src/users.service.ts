import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel : Model<UserDocument>
     // Model is a Mongoose model interface
     //UserDocument is a TypeScript interface (or type) that represents the shape of the documents
  ) {

  }
  getHello(): string {
    return 'Hello World!';
  }
}
