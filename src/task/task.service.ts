import { tasks } from './data/task';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/CreateTaskDTO';
import { UpdateTaskDto } from './dto/UpdateTaskDto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: CreateTaskDto) {
    const task = await this.prisma.tasks.create({
      data: data,
    });

    return {
      status_code: 200,
      data: task,
      message: 'Task created successfully',
    };
  }

  async getAllTask() {
    const tasks = await this.prisma.tasks.findMany();
    return {
      status_code: 200,
      data: tasks,
      message: 'Get All Task successfully',
    };
  }

  async getTaskById(id: number) {
    const task = await this.prisma.tasks.findFirst({
      where: {
        id: id,
      },
    });

    if (!task) {
      return {
        status_code: 200,
        message: 'Task not found',
      };
    }

    return {
      status_code: 200,
      data: task,
      message: 'Get Task successfully',
    };
  }

  async updateTaskById(id: number, data: UpdateTaskDto) {
    const task = await this.prisma.tasks.findFirst({
      where: {
        id: id,
      },
    });

    if (!task) {
      return {
        status_code: 200,
        message: 'Task not found',
      };
    }

    const updatedTask = await this.prisma.tasks.update({
      where: {
        id: task.id,
      },
      data: data,
    });

    return {
      status_code: 200,
      data: updatedTask,
    };
  }

  async deleteTaskById(id: number) {
    const task = await this.prisma.tasks.findFirst({
      where: {
        id: id,
      },
    });

    if (!task) {
      return {
        status_code: 200,
        message: 'Task not found',
      };
    }

    const deletedTask = await this.prisma.tasks.delete({
      where: {
        id: task.id,
      },
    });

    return {
      status_code: 200,
      data: deletedTask,
      message: 'Task deleted successfully',
    };
  }
}
