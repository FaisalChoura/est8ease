import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseConfigModule } from './mongoose.module';
import { PropertiesModule } from './properties/properties.module';
import { InterestsModule } from './interests/interests.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ClicksController } from './clicks/clicks.controller';
import { ClicksModule } from './clicks/clicks.module';

@Module({
  imports: [
    MongooseConfigModule,
    PropertiesModule,
    InterestsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'est8ease-fe'),
      exclude: ['/api*'],
    }),
    ClicksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
