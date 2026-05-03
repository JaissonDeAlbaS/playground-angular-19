import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../models/task.model';
import { BadgeComponent } from '../../atoms/badge/badge.component';
import { CardComponent } from '../../atoms/card/card.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, BadgeComponent, CardComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  // Inputs
  readonly task = input.required<Task>();
  readonly statusColor = input<string>('');

  // Outputs
  readonly edit = output<Task>();
  readonly delete = output<string>();

  onEdit(): void {
    this.edit.emit(this.task());
  }

  onDelete(): void {
    this.delete.emit(this.task().id);
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'Sin fecha';
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short'
    });
  }

  isOverdue(date: Date | undefined, status: string): boolean {
    if (!date || status === 'done') return false;
    const now = new Date();
    const due = new Date(date);
    return due < now;
  }

  isDueSoon(date: Date | undefined): boolean {
    if (!date) return false;
    const now = new Date();
    const due = new Date(date);
    const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  }

  getDueDateClasses(): string {
    const task = this.task();
    const isOverdue = this.isOverdue(task.dueDate, task.status);
    const isDueSoon = this.isDueSoon(task.dueDate) && !isOverdue;

    if (isOverdue) {
      return 'text-xs px-2 py-0.5 rounded-full text-red-400 bg-red-900/30';
    } else if (isDueSoon) {
      return 'text-xs px-2 py-0.5 rounded-full text-amber-400 bg-amber-900/30';
    } else {
      return 'text-xs px-2 py-0.5 rounded-full text-slate-400 bg-slate-700/50';
    }
  }
}
