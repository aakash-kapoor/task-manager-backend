import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('boards')
@UseGuards(JwtGuard)
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.boardsService.createBoard(req.user.userId, body);
  }

  @Get()
  getAll(@Req() req: any) {
    return this.boardsService.getBoards(req.user.userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: any) {
    return this.boardsService.deleteBoard(id, req.user.userId);
  }
}