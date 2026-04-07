import { Injectable } from '@nestjs/common';
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
        tasks: true, // optional (good for frontend)
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
}