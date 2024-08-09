import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseConfigModule } from './mongoose.module';
import { PropertiesModule } from './properties/properties.module';
import { InterestsModule } from './interests/interests.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseConfigModule,
    PropertiesModule,
    InterestsModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'est8ease-fe'),
    //   exclude: ['/api*'],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
