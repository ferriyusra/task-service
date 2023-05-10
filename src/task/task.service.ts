import { tasks } from './data/task';
import { CreateTaskDto } from './dto/CreateTaskDTO';
import { UpdateTaskDto } from './dto/UpdateTaskDto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  async createTask(data: CreateTaskDto) {
    return {
      statusCode: 200,
      data,
    };
  }

  async getAllTask() {
    return {
      statusCode: 200,
      data: tasks,
    };
  }

  async getTaskById(id: number) {
    return {
      statusCode: 200,
      data: tasks.find((task) => task.id == id),
    };
  }

  async updateTaskById(id: number, data: UpdateTaskDto) {
    return {
      statusCode: 200,
      data: data,
    };
  }

  async deleteTaskById(id: number) {
    return {
      statusCode: 200,
      data: tasks.find((task) => task.id == id),
      message: 'Task deleted successfully',
    };
  }
}
