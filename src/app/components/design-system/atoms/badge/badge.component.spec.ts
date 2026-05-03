import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent, BadgeColor } from './badge.component';
import { CommonModule } from '@angular/common';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default color as slate', () => {
    expect(component.color()).toBe('slate');
  });

  it('should have empty text by default', () => {
    expect(component.text()).toBe('');
  });

  it('should apply slate color classes', () => {
    fixture.componentRef.setInput('color', 'slate');
    fixture.detectChanges();
    const classes = component.badgeClasses;
    expect(classes).toContain('bg-slate-700');
    expect(classes).toContain('text-slate-200');
  });

  it('should apply emerald color classes', () => {
    fixture.componentRef.setInput('color', 'emerald');
    fixture.detectChanges();
    const classes = component.badgeClasses;
    expect(classes).toContain('bg-emerald-900/30');
    expect(classes).toContain('text-emerald-400');
  });

  it('should apply red color classes', () => {
    fixture.componentRef.setInput('color', 'red');
    fixture.detectChanges();
    const classes = component.badgeClasses;
    expect(classes).toContain('bg-red-900/30');
    expect(classes).toContain('text-red-400');
  });

  it('should apply amber color classes', () => {
    fixture.componentRef.setInput('color', 'amber');
    fixture.detectChanges();
    const classes = component.badgeClasses;
    expect(classes).toContain('bg-amber-900/30');
    expect(classes).toContain('text-amber-400');
  });

  it('should display text correctly', () => {
    fixture.componentRef.setInput('text', 'Test Badge');
    fixture.detectChanges();

    const badgeElement = fixture.nativeElement.querySelector('span');
    expect(badgeElement.textContent.trim()).toBe('Test Badge');
  });

  it('should apply correct base classes', () => {
    fixture.detectChanges();
    const classes = component.badgeClasses;
    expect(classes).toContain('inline-flex');
    expect(classes).toContain('items-center');
    expect(classes).toContain('rounded-full');
    expect(classes).toContain('text-xs');
    expect(classes).toContain('font-medium');
    expect(classes).toContain('border');
  });
});
