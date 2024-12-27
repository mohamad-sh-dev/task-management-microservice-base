import { HttpStatus, Injectable } from '@nestjs/common';
import { Token, TokenDocument } from './schema/token.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private JwtService: JwtService
  ) { }

  async createToken(userId: string) {

    const createdToken = this.JwtService.sign({ userId }, {
      expiresIn: 60 * 60 * 24,
      secret: 'test'
    })
    const userToken = await this.tokenModel.findOne({ userId })
    if (userToken) {
      userToken.token = createdToken;
      await userToken.save();
    }
    else {
      await this.tokenModel.create({
        userId,
        token: createdToken
      })
    }

    return {
      message: 'token created successfully',
      status: HttpStatus.CREATED,
      data: createdToken,
    }
    // return 'Hello World!';
  }
}
