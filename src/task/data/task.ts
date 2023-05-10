export interface Task {
  id: number;
  taskName: string;
  taskDescription: string;
}
export const tasks: Task[] = [
  {
    id: 1,
    taskName: 'task name 1',
    taskDescription: 'task description 1',
  },
  {
    id: 2,
    taskName: 'task name 2',
    taskDescription: 'task description 2',
  },
  {
    id: 3,
    taskName: 'task name 3',
    taskDescription: 'task description 3',
  },
];
