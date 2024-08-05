import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseConfigModule } from './mongoose.module';
import { PropertiesModule } from './properties/properties.module';
import { InterestsModule } from './interests/interests.module';

@Module({
  imports: [MongooseConfigModule, PropertiesModule, InterestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
