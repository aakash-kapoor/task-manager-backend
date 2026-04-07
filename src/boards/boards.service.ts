import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  createBoard(userId: string, data: any) {
    return this.prisma.board.create({
      data: {
        title: data.title,
        ownerId: userId,
      },
    });
  }

  getBoards(userId: string) {
    return this.prisma.board.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        lists: {
          include: {
            tasks: true, // This fetches the tasks inside each list
          }
        }
      },
    });
  }

  deleteBoard(boardId: string, userId: string) {
    return this.prisma.board.deleteMany({
      where: {
        id: boardId,
        ownerId: userId,
      },
    });
  }

  async getBoardWithDetails(boardId: string, userId: string) {
  const board = await this.prisma.board.findFirst({
    where: { 
      id: boardId, 
      ownerId: userId // Ensure the user actually owns this board
    },
    include: {
      lists: {
        orderBy: { order: 'asc' }, // Sort columns left-to-right
        include: {
          tasks: {
            orderBy: { order: 'asc' }, // Sort cards top-to-bottom
            include: {
              assignedTo: {
                select: { id: true, name: true, email: true } // Don't send the password hash!
              }
            }
          }
        }
      }
    }
  });

  if (!board) {
    throw new NotFoundException('Board not found');
  }

  return board;
}
}