import { Injectable, OnModuleInit } from '@nestjs/common';
import { prisma, PrismaClient } from '@grouphub/database';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }
}
