import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice((UsersModule) , {
     transport : Transport.TCP, 
     options : {
      port : 4001 ,
      host : '0.0.0.0'
     }
  } as TcpOptions);
  await app.listen();
  console.log('Users Microservice is listening on port 4001');
}
bootstrap();
