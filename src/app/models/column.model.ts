import { Task } from './task.model';

export interface Column {
  id: string;
  title: string;
  status: Task['status'];
  tasks: Task[];
}
