import { Controller, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('tasks')
@UseGuards(JwtGuard) // Protect these routes
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() body: { title: string; listId: string; description?: string }) {
    return this.tasksService.createTask(body);
  }

  // Endpoint hit when a user drops a card in the Angular UI
  @Patch(':id/move')
  moveTask(
    @Param('id') id: string,
    @Body() body: { newListId: string; newOrder: number },
  ) {
    return this.tasksService.moveTask(id, body.newListId, body.newOrder);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
