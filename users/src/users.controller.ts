import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { IFindById, ILogin, ISignup } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern('signup')
  signup(signupDto: ISignup) {
    return this.usersService.signup(signupDto)
  }
  @MessagePattern('login')
  login(loginDto: ILogin) {
    return this.usersService.login(loginDto)
  }
  @MessagePattern('findById')
  findById(findByIdDto: IFindById) {
    return this.usersService.findById(findByIdDto)
  }
}
