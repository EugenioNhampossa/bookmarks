import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDTO } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getBookmarks(userId: number) {
    return await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

  async getBookmarkById(id: number) {
    return await this.prisma.bookmark.findUnique({
      where: {
        id,
      },
    });
  }

  async createBookmark(userId: number, dto: CreateBookmarkDTO) {
    return await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });
  }
}
