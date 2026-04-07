import { Controller, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ListsService } from './lists.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('lists')
@UseGuards(JwtGuard)
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  createList(@Body() body: { boardId: string; title: string }) {
    return this.listsService.createList(body);
  }

  // Endpoint hit when a user drags a column horizontally
  @Patch(':id/move')
  moveList(
    @Param('id') id: string,
    @Body() body: { newOrder: number },
  ) {
    return this.listsService.moveList(id, body.newOrder);
  }

  @Delete(':id')
  deleteList(@Param('id') id: string) {
    return this.listsService.deleteList(id);
  }
}