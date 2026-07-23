import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CommunityModule } from './community/community.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [PrismaModule, CommunityModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
