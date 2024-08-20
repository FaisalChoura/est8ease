import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Click, ClickSchema } from './schemas/clicks.schema';
import { ClicksController } from './clicks.controller';
import { ClicksService } from './clicks.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Click.name, schema: ClickSchema }]),
  ],
  // providers: [InterestsService],
  controllers: [ClicksController],
  providers: [ClicksService],
})
export class ClicksModule {}
