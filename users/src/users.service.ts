import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { IFindById, ILogin, ISignup } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel : Model<UserDocument>
     // Model is a Mongoose model interface
     //UserDocument is a TypeScript interface (or type) that represents the shape of the documents
  ) {

  }
  signup(signupDto: ISignup) {
    console.log(signupDto)
  }
  login(loginDto: ILogin) {
    console.log(loginDto)
  }
  findById(findByIdDto: IFindById) {
    console.log(findByIdDto)
  }
}
