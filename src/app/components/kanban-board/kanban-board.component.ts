import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Column } from '../../models/column.model';
import { Task } from '../../models/task.model';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent {
  private readonly taskService = inject(TaskService);

  // Modal state
  showModal = signal(false);
  editingTask = signal<Task | undefined>(undefined);

  readonly columns: Column[] = [
    { id: 'todo', title: 'Por hacer', status: 'todo', tasks: [] },
    { id: 'in-progress', title: 'En progreso', status: 'in-progress', tasks: [] },
    { id: 'done', title: 'Completado', status: 'done', tasks: [] }
  ];

  readonly todoTasks = this.taskService.todoTasks;
  readonly inProgressTasks = this.taskService.inProgressTasks;
  readonly doneTasks = this.taskService.doneTasks;

  getTasksForColumn(status: 'todo' | 'in-progress' | 'done') {
    switch (status) {
      case 'todo': return this.todoTasks();
      case 'in-progress': return this.inProgressTasks();
      case 'done': return this.doneTasks();
    }
  }

  moveToStatus(taskId: string, newStatus: 'todo' | 'in-progress' | 'done') {
    this.taskService.moveTask(taskId, newStatus);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
  }

  onDrop(event: DragEvent, newStatus: 'todo' | 'in-progress' | 'done') {
    event.preventDefault();
    const taskId = event.dataTransfer?.getData('text/plain');
    if (taskId) {
      this.moveToStatus(taskId, newStatus);
    }
  }

  onDragStart(event: DragEvent, taskId: string) {
    event.dataTransfer?.setData('text/plain', taskId);
  }

  deleteTask(taskId: string) {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      this.taskService.deleteTask(taskId);
    }
  }

  getColumnColor(status: string): string {
    switch (status) {
      case 'todo': return '#ef4444';
      case 'in-progress': return '#f59e0b';
      case 'done': return '#22c55e';
      default: return '#6b7280';
    }
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short'
    });
  }

  // Tailwind helper methods
  getColumnHeaderClass(status: string): string {
    switch (status) {
      case 'todo': return 'bg-gradient-to-r from-red-500/20 to-red-600/10';
      case 'in-progress': return 'bg-gradient-to-r from-amber-500/20 to-amber-600/10';
      case 'done': return 'bg-gradient-to-r from-emerald-500/20 to-emerald-600/10';
      default: return 'bg-slate-700';
    }
  }

  getColumnDotClass(status: string): string {
    switch (status) {
      case 'todo': return 'bg-red-500 shadow-lg shadow-red-500/50';
      case 'in-progress': return 'bg-amber-500 shadow-lg shadow-amber-500/50';
      case 'done': return 'bg-emerald-500 shadow-lg shadow-emerald-500/50';
      default: return 'bg-slate-500';
    }
  }

  // Modal methods
  openCreateModal() {
    this.editingTask.set(undefined);
    this.showModal.set(true);
  }

  openEditModal(task: Task) {
    this.editingTask.set(task);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingTask.set(undefined);
  }

  onSaveTask(taskData: Omit<Task, 'id' | 'createdAt'>) {
    const task = this.editingTask();
    if (task) {
      // Update existing task
      this.taskService.updateTask(task.id, taskData);
    } else {
      // Create new task
      this.taskService.createTask(taskData);
    }
    this.closeModal();
  }
}
