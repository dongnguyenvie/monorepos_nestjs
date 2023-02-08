import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const origin = (configService.get('ORIGIN_DOMAIN') || '').split(',') as string[];
  const isAllowAllDomain = !!origin.find((domain) => domain == '*');

  app.enableCors({
    credentials: true,
    origin: isAllowAllDomain ? '*' : origin,
  });
  app.setGlobalPrefix('api', { exclude: [] });
  // app.use(cookieParser());
  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new ErrorsInterceptor());

  await app.listen(configService.get('PORT') || 7000);
}
bootstrap();
