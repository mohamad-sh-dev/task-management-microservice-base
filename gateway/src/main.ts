import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const documentOptions = new DocumentBuilder() //This class is designed to help build and configure an OpenAPI document
  .setTitle('taskManager-MicroserviceBase')
  .setVersion('v1')
  .addBearerAuth({
    type :  "http" ,
    bearerFormat : "JWT" ,
    in : "header" ,
    scheme : "bearer"
  } , 'Authorization').build();
  const document = SwaggerModule.createDocument(app , documentOptions);
  SwaggerModule.setup('/' , app , document)
  await app.listen(4000);
  
}
bootstrap();
