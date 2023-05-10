import { CreateTaskDto } from './dto/CreateTaskDTO';
import { UpdateTaskDto } from './dto/UpdateTaskDto';
import { Param, Body, Controller, Post, Get, Patch } from '@nestjs/common';
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

  @Get('/:id')
  async getTaskById(@Param('id') id) {
    return await this.taskService.getTaskById(id);
  }

  @Patch('/:id')
  async updateTaskById(@Param('id') id, @Body() body: UpdateTaskDto) {
    return await this.taskService.updateTaskById(id, body);
  }
}
