import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/task-management'),
    // the forRoot method is commonly used to configure and initialize modules with global settings
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }
      // making it available for dependency injection and use within the module
    ]),
    
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }