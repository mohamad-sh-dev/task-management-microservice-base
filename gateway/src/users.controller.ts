import { Body, Controller, Get, HttpException, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto, SignupDto } from './dto/users.dto';
import { catchError, lastValueFrom } from 'rxjs';
import { ApiConsumes } from '@nestjs/swagger';
import { log } from 'console';

@Controller('/user')
export class UsersController {
  constructor
    (
      @Inject('USER_SERVICE') private userClientService: ClientProxy,
      @Inject('TOKEN_SERVICE') private tokenClientService: ClientProxy
    ) { }

  @Post('/signup')
  @ApiConsumes('application/x-www-form-urlencoded')
  async signup(
    @Body() signupDto: SignupDto
  ) {
    const response = await lastValueFrom(this.userClientService.send('signup', signupDto));
    //lastValueFrom is a utility function provided by the rxjs library in JavaScript/TypeScript.
    //It is used to convert an Observable into a Promise that resolves with  the last emitted value from the Observable
    //* import { lastValueFrom, of } from 'rxjs';
    //*const observable = of(1, 2, 3);

    // *async function getLastValue() {
    //*   const lastValue = await lastValueFrom(observable);
    //*   console.log(lastValue); // Output: 3
    //* }
    //* getLastValue();
   
    if (response.error) {
      throw new HttpException(response.message, response.status)
    }
    const { userId } = response?.data
    if (userId) {
      const token = await lastValueFrom(this.tokenClientService.send('create_user_token', {userId}))
      if(token) {
        response.data.token = token.data ;
        delete response?.data?.userId ;
      }else {
        throw new HttpException('something wrong in generate user token', 500)
      }
    }
    return response;
  }
  @Post('/login')
  @ApiConsumes('application/x-www-form-urlencoded')
  async login(
    @Body() loginDto: LoginDto
  ) {
    const response = await lastValueFrom(this.userClientService.send('login', loginDto).pipe(
      catchError((error) => {
        throw new HttpException(error.message, error.status
        )
      }
    )));
    if (response.error) {
      throw new HttpException(response.message, response.status)
    }
    const { userId } = response?.data
    if (userId) {
      const token = await lastValueFrom(this.tokenClientService.send('create_user_token', {userId}))
      if(token) {
        response.data.token = token.data ;
        delete response?.data?.userId ;
      }else {
        throw new HttpException('something wrong in generate user token', 500)
      }
    }
    return response;
  }
}
