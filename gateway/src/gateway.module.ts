import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { GatewayService } from './gateway.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [GatewayService , {
    // This useFactory method creates and returns a TCP client proxy using the ClientProxyFactory. 
    // A client proxy is typically used in microservices architecture to communicate with other services.
    // The proxy is configured to communicate over TCP on port 4001 and is accessible on all network interfaces (0.0.0.0).
    provide : 'USER_SERVICE' ,
    useFactory(){
      return ClientProxyFactory.create({
        transport : Transport.TCP ,
        options : {
          port : 4001, 
          host : '0.0.0.0'
        }
      })
    }
  } ,
  {
    // This useFactory method creates and returns a TCP client proxy using the ClientProxyFactory. 
    // A client proxy is typically used in microservices architecture to communicate with other services.
    // The proxy is configured to communicate over TCP on port 4001 and is accessible on all network interfaces (0.0.0.0).
    provide : 'TOKEN_SERVICE' ,
    useFactory(){
      return ClientProxyFactory.create({
        transport : Transport.TCP ,
        options : {
          port : 4002, 
          host : '0.0.0.0'
        }
      })
    }
  }
],
})
export class GatewayModule { }
