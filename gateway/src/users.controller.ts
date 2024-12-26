import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SignupDto } from './dto/users.dto';
import { lastValueFrom } from 'rxjs';

@Controller('/user')
export class UsersController {
  constructor
    (@Inject('USER_SERVICE') private userClientService: ClientProxy) { }

  @Post()
  async signup(
    @Body() signupDto: SignupDto
  ) {
    return await lastValueFrom(this.userClientService.send('signup', signupDto));

    //lastValueFrom is a utility function provided by the rxjs library in JavaScript/TypeScript.
    //It is used to convert an Observable into a Promise that resolves with the last emitted value from the Observable
    //* import { lastValueFrom, of } from 'rxjs';
    //*const observable = of(1, 2, 3);

    // *async function getLastValue() {
    //*   const lastValue = await lastValueFrom(observable);
    //*   console.log(lastValue); // Output: 3
    //* }
    //* getLastValue();
  }
}
