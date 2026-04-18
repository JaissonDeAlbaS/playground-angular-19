import { Component, input, output, signal, computed, effect, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  // Inputs
  readonly task = input<Task | undefined>(undefined);

  // Outputs
  readonly save = output<Task>();
  readonly cancel = output<void>();

  // Form
  taskForm!: FormGroup;

  // UI State
  readonly isVisible = signal(false);
  readonly isAnimating = signal(false);

  // Computed
  readonly isEditMode = computed(() => !!this.task());

  constructor(private readonly fb: FormBuilder) {
    effect(() => {
      // Watch for task input changes
      const currentTask = this.task();
      if (currentTask !== undefined) {
        this.initFormWithTask(currentTask);
      } else {
        this.initEmptyForm();
      }
    });
  }

  ngOnInit(): void {
    // Initialize animation state
    requestAnimationFrame(() => {
      this.isVisible.set(true);
      this.isAnimating.set(true);
    });
  }

  private initEmptyForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      status: ['todo' as const],
      dueDate: ['']
    });
  }

  private initFormWithTask(task: Task): void {
    this.taskForm = this.fb.group({
      title: [task.title, [Validators.required, Validators.minLength(3)]],
      description: [task.description || ''],
      status: [task.status as 'todo' | 'in-progress' | 'done'],
      dueDate: [this.formatDateForInput(task.dueDate)]
    });
  }

  private formatDateForInput(date: Date | undefined | null): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const formValue = this.taskForm.value;
    const taskData: Omit<Task, 'id' | 'createdAt'> = {
      title: formValue.title.trim(),
      description: formValue.description?.trim() || '',
      status: formValue.status,
      dueDate: formValue.dueDate ? new Date(formValue.dueDate) : undefined
    };

    this.save.emit(taskData as Task);
    this.closeModal();
  }

  onCancel(): void {
    this.cancel.emit();
    this.closeModal();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onCancel();
    }
  }

  private closeModal(): void {
    this.isVisible.set(false);
    this.isAnimating.set(false);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return !!(field && field.valid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.taskForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;
    if (errors['required']) return 'Este campo es requerido';
    if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    return 'Campo inválido';
  }

  // Keyboard accessibility
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.onCancel();
    }
  }
}
