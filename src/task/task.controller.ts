import { CreateTaskDto } from './dto/CreateTaskDTO';
import { UpdateTaskDto } from './dto/UpdateTaskDto';
import {
  Param,
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
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
    return await this.taskService.getTaskById(parseInt(id));
  }

  @Patch('/:id')
  async updateTaskById(@Param('id') id, @Body() body: UpdateTaskDto) {
    return await this.taskService.updateTaskById(parseInt(id), body);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id) {
    return await this.taskService.deleteTaskById(id);
  }
}
