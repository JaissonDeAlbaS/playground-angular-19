import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCardComponent } from './task-card.component';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../../atoms/badge/badge.component';
import { CardComponent } from '../../atoms/card/card.component';
import { Task } from '../../../../models/task.model';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'todo',
    createdAt: new Date('2026-01-01'),
    dueDate: new Date('2026-12-31')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardComponent, CommonModule, BadgeComponent, CardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('task', mockTask);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display task title', () => {
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('h4');
    expect(titleElement.textContent.trim()).toBe('Test Task');
  });

  it('should display task description when provided', () => {
    fixture.detectChanges();
    const descriptionElement = fixture.nativeElement.querySelector('p');
    expect(descriptionElement.textContent.trim()).toBe('Test Description');
  });

  it('should emit edit event when edit button is clicked', () => {
    fixture.detectChanges();
    const editSpy = jasmine.createSpy();
    component.edit.subscribe(editSpy);

    const editButton = fixture.nativeElement.querySelector('button[title="Editar"]');
    editButton.click();

    expect(editSpy).toHaveBeenCalledWith(mockTask);
  });

  it('should emit delete event when delete button is clicked', () => {
    fixture.detectChanges();
    const deleteSpy = jasmine.createSpy();
    component.delete.subscribe(deleteSpy);

    const deleteButton = fixture.nativeElement.querySelector('button[title="Eliminar"]');
    deleteButton.click();

    expect(deleteSpy).toHaveBeenCalledWith('1');
  });

  it('should apply status color to dot indicator', () => {
    fixture.componentRef.setInput('statusColor', '#ef4444');
    fixture.detectChanges();

    const dot = fixture.nativeElement.querySelector('.rounded-full');
    expect(dot.style.backgroundColor).toBe('rgb(239, 68, 68)');
  });

  it('should format date correctly', () => {
    const formatted = component.formatDate(new Date('2026-05-15'));
    expect(formatted).toBeTruthy();
  });

  it('should return true for overdue task', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 5);
    const result = component.isOverdue(pastDate, 'todo');
    expect(result).toBeTrue();
  });

  it('should return false for overdue task with done status', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 5);
    const result = component.isOverdue(pastDate, 'done');
    expect(result).toBeFalse();
  });

  it('should return true for due soon task', () => {
    const soonDate = new Date();
    soonDate.setDate(soonDate.getDate() + 2);
    const result = component.isDueSoon(soonDate);
    expect(result).toBeTrue();
  });

  it('should return false for due soon when no date', () => {
    const result = component.isDueSoon(undefined);
    expect(result).toBeFalse();
  });

  it('should have hoverable card', () => {
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('app-card');
    expect(card).not.toBeNull();
  });
});
