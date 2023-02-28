import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDTO, EditBookmarkDTO } from './dto';

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

  async getBookmarkById(userId: number, id: number) {
    return await this.prisma.bookmark.findFirst({
      where: {
        userId,
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

  async deleteBookmark(userId: number, id: number) {
    return await this.prisma.bookmark.deleteMany({
      where: {
        userId,
        id,
      },
    });
  }

  async editBookmark(userId: number, id: number, dto: EditBookmarkDTO) {
    return await this.prisma.bookmark.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }
}
