import { Controller, Get } from '@nestjs/common';
import { TokenService } from './token.service';
import { MessagePattern } from '@nestjs/microservices';
import { IToken } from './interfaces/token.interface';

@Controller()
export class TokenController {
  constructor(private tokenService: TokenService) { }

  @MessagePattern('create_user_token')
  createToken({userId} : IToken) {
    return this.tokenService.createToken(userId);
  }
}
