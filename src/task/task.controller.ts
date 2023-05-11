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
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createTask(@Body() body: CreateTaskDto) {
    return await this.taskService.createTask(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllTask() {
    return await this.taskService.getAllTask();
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getTaskById(@Param('id') id) {
    return await this.taskService.getTaskById(parseInt(id));
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateTaskById(@Param('id') id, @Body() body: UpdateTaskDto) {
    return await this.taskService.updateTaskById(parseInt(id), body);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteTaskById(@Param('id') id) {
    return await this.taskService.deleteTaskById(parseInt(id));
  }
}
