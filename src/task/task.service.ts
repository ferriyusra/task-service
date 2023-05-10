import { CreateTaskDto } from './dto/CreateTaskDTO';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  async createTask(data: CreateTaskDto) {
    return 'create a new task service';
  }

  async getAllTask() {
    return 'get all tasks';
  }

  async getTaskById(id: string) {
    return 'get a task by id';
  }
}
