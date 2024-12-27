import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schema/token.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/task-management'),
    // the forRoot method is commonly used to configure and initialize modules with global settings
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }
      // making it available for dependency injection and use within the module
    ]),
  ],
  controllers: [TokenController],
  providers: [TokenService , JwtService],
})
export class TokenModule { }
