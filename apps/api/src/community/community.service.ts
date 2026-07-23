import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommunityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommunityDto: CreateCommunityDto) {
    return this.prisma.community.create({
      data: createCommunityDto,
    });
  }

  async findAll(query?: string) {
    if (query) {
      return this.prisma.community.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        orderBy: { memberCount: 'desc' },
      });
    }
    return this.prisma.community.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string) {
    const community = await this.prisma.community.findUnique({
      where: { id },
    });
    if (!community) {
      throw new NotFoundException(`Community #${id} not found`);
    }
    return community;
  }

  async update(id: string, updateCommunityDto: UpdateCommunityDto) {
    return this.prisma.community.update({
      where: { id },
      data: updateCommunityDto,
    });
  }

  async remove(id: string) {
    return this.prisma.community.delete({
      where: { id },
    });
  }
}
