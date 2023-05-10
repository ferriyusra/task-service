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
    };
  }

  async getTaskById(id: number) {
    return {
      status_code: 200,
      data: tasks.find((task) => task.id == id),
    };
  }

  async updateTaskById(id: number, data: UpdateTaskDto) {
    return {
      status_code: 200,
      data: data,
    };
  }

  async deleteTaskById(id: number) {
    return {
      status_code: 200,
      data: tasks.find((task) => task.id == id),
      message: 'Task deleted successfully',
    };
  }
}
