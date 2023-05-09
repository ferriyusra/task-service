import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  async createTask() {
    return 'create a new task service';
  }
}
