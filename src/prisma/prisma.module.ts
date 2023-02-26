import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //This module will be availeble to all modules
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
