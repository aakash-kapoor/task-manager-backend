import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: { title: string; listId: string; description?: string }) {
    // 1. Find the current highest order in the list so we can place the new task at the bottom
    const lastTask = await this.prisma.task.findFirst({
      where: { listId: data.listId },
      orderBy: { order: 'desc' },
    });

    const newOrder = lastTask ? lastTask.order + 1024 : 1024; // Arbitrary gap of 1024

    // 2. Create the task
    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        listId: data.listId,
        order: newOrder,
      },
    });
  }

  async moveTask(taskId: string, newListId: string, newOrder: number) {
    // Verify the task exists
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Update the task with its new list (if moved across columns) and new order (visual position)
    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        listId: newListId,
        order: newOrder,
      },
    });
  }

  async deleteTask(taskId: string) {
    return this.prisma.task.delete({
      where: { id: taskId },
    });
  }
}