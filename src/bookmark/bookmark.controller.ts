import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../Auth/decorator';
import { JwtGuard } from '../Auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDTO } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(userId);
  }

  @Get(':id')
  getBookmarkById(@Param('id') id: string) {
    console.log({ id });

    return this.bookmarkService.getBookmarkById(parseInt(id));
  }

  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDTO,
  ) {
    return this.bookmarkService.createBookmark(userId, dto);
  }
}
