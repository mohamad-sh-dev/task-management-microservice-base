import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { IFindById, ILogin, ISignup } from './interfaces/user.interface';
import * as bcrypt from "bcrypt"
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
    // Model is a Mongoose model interface
    //UserDocument is a TypeScript interface (or type) that represents the shape of the documents
  ) {

  }
  async signup(signupDto: ISignup) {
    let { email, password, name } = signupDto;
    email = email.toLowerCase();
    const user = await this.userModel.findOne({ email })
    if (user) {
      return {
        message: 'user already exist with this email',
        status: HttpStatus.CONFLICT,
        error: true
      }
    }
    password = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const newUser = await this.userModel.create({
      email,
      password,
      name
    });
    return {
      message: 'user created successfully',
      status: HttpStatus.CREATED,
      data: {
        userId: newUser._id.toString()
      }
    }
  }
  async login(loginDto: ILogin) {
    let { email, password } = loginDto;
    email = email.toLowerCase();
    const user = await this.userModel.findOne({email}) ;
    if(!user) {
      return {
        message: 'user account not found',
        status: HttpStatus.UNAUTHORIZED,
        error: true
      }
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return {
        message: 'invalid credentials',
        status: HttpStatus.UNAUTHORIZED,
        error: true
      }
    }
    return {
      message: 'login successfully',
      status: HttpStatus.OK,
      data: {
        userId: user._id.toString()
      }
    }
  }
  findById(findByIdDto: IFindById) {
    console.log(findByIdDto)
  }
}
