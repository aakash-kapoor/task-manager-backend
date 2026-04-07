/*
  Warnings:

  - The `status` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priority` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('todo', 'in_progress', 'done');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('low', 'medium', 'high');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'todo',
DROP COLUMN "priority",
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'medium';

-- CreateIndex
CREATE INDEX "Task_boardId_idx" ON "Task"("boardId");

-- CreateIndex
CREATE INDEX "Task_assignedToId_idx" ON "Task"("assignedToId");
