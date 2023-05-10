import { CreateTaskDto } from './dto/CreateTaskDTO';
import { Param, Body, Controller, Post, Get } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async createTask(@Body() body: CreateTaskDto) {
    return await this.taskService.createTask(body);
  }

  @Get()
  async getAllTask() {
    return await this.taskService.getAllTask();
  }

  @Get(':id')
  async getTaskById(@Param('id') id) {
    return await this.taskService.getTaskById(id);
  }
}
