import { CreateTaskDto } from './dto/CreateTaskDTO';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  async createTask(data: CreateTaskDto) {
    return 'create a new task service';
  }
}
