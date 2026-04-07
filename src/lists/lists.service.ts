import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ListsService {
  constructor(private prisma: PrismaService) {}

  async createList(data: { boardId: string; title: string }) {
    // Find the right-most column on this board
    const lastList = await this.prisma.list.findFirst({
      where: { boardId: data.boardId },
      orderBy: { order: 'desc' },
    });

    // Add a large gap (1024) so we have plenty of decimal space for drag-and-drop later
    const newOrder = lastList ? lastList.order + 1024 : 1024;

    return this.prisma.list.create({
      data: {
        title: data.title,
        boardId: data.boardId,
        order: newOrder,
      },
    });
  }

  async moveList(listId: string, newOrder: number) {
    // Updates the horizontal position of the column
    return this.prisma.list.update({
      where: { id: listId },
      data: { order: newOrder },
    });
  }

  async deleteList(listId: string) {
    // Thanks to onDelete: Cascade in your schema, deleting a list 
    // will automatically delete all tasks inside it!
    return this.prisma.list.delete({
      where: { id: listId },
    });
  }
}