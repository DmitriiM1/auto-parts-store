import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      transform: true,
    }
  ));

  const port = process.env.PORT ? Number(process.env.PORT) : 3000


  const prodUrl = process.env.PUBLIC_URL || 'https://auto-parts-store-fa9b.onrender.com'

  const config = new DocumentBuilder()
    .setTitle('Auto Parts Store API')
    .setDescription('Backend API for Auto Parts Store')
    .setVersion('1.0.0')
    .addServer(prodUrl, 'Production (Render)')
    .addServer(`http://localhost:${port}`, 'Local')
    .build()



  const document = SwaggerModule.createDocument(app, config)

  if (process.env.NODE_ENV === 'production') {
    const user = process.env.SWAGGER_USER
    const pass = process.env.SWAGGER_PASS

    app.use(['/docs', '/docs-json'], (req: any, res: any, next: any) => {
      if (!user || !pass) return res.status(500).send('Swagger auth is not configured')

      const header = req.headers['authorization'] || ''
      const [type, token] = header.split(' ')

      if (type !== 'Basic' || !token) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Swagger"')
        return res.status(401).send('Authentication required')
      }

      const decoded = Buffer.from(token, 'base64').toString('utf8')
      const [u, p] = decoded.split(':')

      if (u === user && p === pass) return next()

      res.setHeader('WWW-Authenticate', 'Basic realm="Swagger"')
      return res.status(401).send('Invalid credentials')
    })
  }
  SwaggerModule.setup('docs', app, document)

  await app.listen(port)
}
bootstrap();
