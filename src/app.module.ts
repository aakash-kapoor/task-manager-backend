import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }), AuthModule, UsersModule, BoardsModule, TasksModule, PrismaModule, ListsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
