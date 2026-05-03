import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default hoverable as false', () => {
    expect(component.hoverable()).toBe(false);
  });

  it('should have default padding as true', () => {
    expect(component.padding()).toBe(true);
  });

  it('should apply base card classes', () => {
    fixture.detectChanges();
    const classes = component.cardClasses;
    expect(classes).toContain('bg-slate-800');
    expect(classes).toContain('border-slate-700');
    expect(classes).toContain('rounded-lg');
    expect(classes).toContain('shadow-card');
  });

  it('should apply padding classes by default', () => {
    fixture.detectChanges();
    const classes = component.cardClasses;
    expect(classes).toContain('p-4');
  });

  it('should not apply padding when padding is false', () => {
    fixture.componentRef.setInput('padding', false);
    fixture.detectChanges();
    const classes = component.cardClasses;
    expect(classes).not.toContain('p-4');
  });

  it('should apply hover classes when hoverable is true', () => {
    fixture.componentRef.setInput('hoverable', true);
    fixture.detectChanges();
    const classes = component.cardClasses;
    expect(classes).toContain('hover:shadow-card-hover');
    expect(classes).toContain('hover:border-slate-600');
    expect(classes).toContain('cursor-pointer');
  });

  it('should render content projection', () => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const cardElement = fixture.nativeElement.querySelector('div');
    cardElement.innerHTML = '<span>Test Content</span>';
    fixture.detectChanges();

    expect(cardElement.innerHTML).toContain('Test Content');
  });
});
