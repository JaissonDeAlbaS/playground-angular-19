import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ButtonComponent, BadgeComponent, InputComponent } from '../../components/design-system';

type SortOption = 'created-desc' | 'created-asc' | 'dueDate-desc' | 'dueDate-asc';
type StatusFilter = 'all' | 'todo' | 'in-progress' | 'done';

@Component({
  selector: 'app-backlog-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskFormComponent, ButtonComponent, BadgeComponent, InputComponent],
  templateUrl: './backlog-list.component.html',
  styleUrl: './backlog-list.component.css'
})
export class BacklogListComponent {
  private readonly taskService = inject(TaskService);

  // Filter signals
  readonly searchQuery = signal('');
  readonly statusFilter = signal<StatusFilter>('all');
  readonly sortOption = signal<SortOption>('created-desc');

  // Modal state
  readonly showModal = signal(false);
  readonly editingTask = signal<Task | undefined>(undefined);

  // All tasks from service
  readonly allTasks = this.taskService.tasks;

  // Computed filtered and sorted tasks
  readonly filteredTasks = computed(() => {
    let tasks = [...this.allTasks()];
    
    // Apply search filter
    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      tasks = tasks.filter(task => 
        task.title.toLowerCase().includes(query) || 
        task.description.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    const status = this.statusFilter();
    if (status !== 'all') {
      tasks = tasks.filter(task => task.status === status);
    }

    // Apply sorting
    const sort = this.sortOption();
    tasks.sort((a, b) => {
      switch (sort) {
        case 'created-desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'created-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'dueDate-desc':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        case 'dueDate-asc':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        default:
          return 0;
      }
    });

    return tasks;
  });

  // Status options
  readonly statusOptions: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'todo', label: 'Por hacer' },
    { value: 'in-progress', label: 'En progreso' },
    { value: 'done', label: 'Completado' }
  ];

  readonly sortOptions: { value: SortOption; label: string }[] = [
    { value: 'created-desc', label: 'Más reciente' },
    { value: 'created-asc', label: 'Más antigua' },
    { value: 'dueDate-desc', label: 'Fecha límite (reciente)' },
    { value: 'dueDate-asc', label: 'Fecha límite (próxima)' }
  ];

  getStatusLabel(status: string): string {
    switch (status) {
      case 'todo': return 'Por hacer';
      case 'in-progress': return 'En progreso';
      case 'done': return 'Completado';
      default: return status;
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'todo': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'in-progress': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'done': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  }

  getStatusDotClass(status: string): string {
    switch (status) {
      case 'todo': return 'bg-red-500';
      case 'in-progress': return 'bg-amber-500';
      case 'done': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  }

  getStatusClasses(status: string): string {
    return this.getStatusColor(status);
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'Sin fecha';
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  isDueSoon(date: Date | undefined): boolean {
    if (!date) return false;
    const now = new Date();
    const due = new Date(date);
    const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  }

  isOverdue(date: Date | undefined, status: string): boolean {
    if (!date || status === 'done') return false;
    const now = new Date();
    const due = new Date(date);
    return due < now;
  }

  onStatusChange(taskId: string, event: Event) {
    // Cycle through statuses on click
    const statuses: Task['status'][] = ['todo', 'in-progress', 'done'];
    const currentTask = this.allTasks().find(t => t.id === taskId);
    if (currentTask) {
      const currentIndex = statuses.indexOf(currentTask.status);
      const nextIndex = (currentIndex + 1) % statuses.length;
      this.taskService.moveTask(taskId, statuses[nextIndex]);
    }
  }

  onStatusChangeSelect(taskId: string, event: Event) {
    event.stopPropagation();
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value as Task['status'];
    this.taskService.moveTask(taskId, newStatus);
  }

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
      this.taskService.updateTask(task.id, taskData);
    } else {
      this.taskService.createTask(taskData);
    }
    this.closeModal();
  }

  deleteTask(taskId: string) {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      this.taskService.deleteTask(taskId);
    }
  }

  clearFilters() {
    this.searchQuery.set('');
    this.statusFilter.set('all');
    this.sortOption.set('created-desc');
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }
}
