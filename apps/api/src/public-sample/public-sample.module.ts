import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module.js';
import { PublicSampleController } from './public-sample.controller.js';
import { PublicSampleService } from './public-sample.service.js';

@Module({
  imports: [CommonModule],
  controllers: [PublicSampleController],
  providers: [PublicSampleService],
})
export class PublicSampleModule {}
