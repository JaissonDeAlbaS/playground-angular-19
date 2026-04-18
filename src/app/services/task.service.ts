import { Injectable, signal, computed, effect } from '@angular/core';
import { Task } from '../models/task.model';

const STORAGE_KEY = 'kanban-tasks';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Diseñar mockups',
    description: 'Crear wireframes y prototipos para la nueva funcionalidad de usuario',
    status: 'done',
    createdAt: new Date('2026-04-10'),
    dueDate: new Date('2026-04-14')
  },
  {
    id: '2',
    title: 'Implementar autenticación',
    description: 'Desarrollar sistema de login con JWT y refresh tokens',
    status: 'in-progress',
    createdAt: new Date('2026-04-12'),
    dueDate: new Date('2026-04-18')
  },
  {
    id: '3',
    title: 'Configurar CI/CD',
    description: 'Pipeline de GitHub Actions para build, test y deploy automático',
    status: 'in-progress',
    createdAt: new Date('2026-04-13'),
    dueDate: new Date('2026-04-20')
  },
  {
    id: '4',
    title: 'Documentar API',
    description: 'Generar documentación OpenAPI/Swagger para endpoints REST',
    status: 'todo',
    createdAt: new Date('2026-04-14'),
    dueDate: new Date('2026-04-25')
  },
  {
    id: '5',
    title: 'Optimizar rendimiento',
    description: 'Analizar y mejorar tiempos de carga con lazy loading y caching',
    status: 'todo',
    createdAt: new Date('2026-04-14'),
    dueDate: new Date('2026-04-28')
  }
];

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly _tasks = signal<Task[]>(this.loadFromStorage());

  readonly tasks = this._tasks.asReadonly();

  readonly todoTasks = computed(() => 
    this._tasks().filter(t => t.status === 'todo')
  );

  readonly inProgressTasks = computed(() => 
    this._tasks().filter(t => t.status === 'in-progress')
  );

  readonly doneTasks = computed(() => 
    this._tasks().filter(t => t.status === 'done')
  );

  constructor() {
    effect(() => {
      this.saveToStorage(this._tasks());
    });
  }

  private loadFromStorage(): Task[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((t: Task) => ({
          ...t,
          createdAt: new Date(t.createdAt),
          dueDate: t.dueDate ? new Date(t.dueDate) : undefined
        }));
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
    }
    return INITIAL_TASKS;
  }

  private saveToStorage(tasks: Task[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  createTask(taskData: Omit<Task, 'id' | 'createdAt'>): Task {
    const newTask: Task = {
      ...taskData,
      id: this.generateId(),
      createdAt: new Date()
    };

    this._tasks.update(tasks => [...tasks, newTask]);
    return newTask;
  }

  updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null {
    let updatedTask: Task | null = null;

    this._tasks.update(tasks => 
      tasks.map(task => {
        if (task.id === id) {
          updatedTask = { ...task, ...updates };
          return updatedTask;
        }
        return task;
      })
    );

    return updatedTask;
  }

  deleteTask(id: string): boolean {
    const initialLength = this._tasks().length;
    this._tasks.update(tasks => tasks.filter(task => task.id !== id));
    return this._tasks().length < initialLength;
  }

  moveTask(taskId: string, newStatus: Task['status']): Task | null {
    return this.updateTask(taskId, { status: newStatus });
  }

  getTaskById(id: string): Task | undefined {
    return this._tasks().find(task => task.id === id);
  }

  getTasksByStatus(status: Task['status']): Task[] {
    return this._tasks().filter(task => task.status === status);
  }

  clearAllTasks(): void {
    this._tasks.set([]);
  }

  resetToInitial(): void {
    this._tasks.set(INITIAL_TASKS);
  }
}
