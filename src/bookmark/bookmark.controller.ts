import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/Auth/guard';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  @Get()
  getBookmarks() {}

  @Get()
  getBookmarksById() {}

  @Post()
  createBookmark() {}
}
