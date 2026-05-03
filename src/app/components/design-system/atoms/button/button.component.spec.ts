import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent, ButtonVariant, ButtonSize } from './button.component';
import { CommonModule } from '@angular/common';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default variant as primary', () => {
    expect(component.variant()).toBe('primary');
  });

  it('should have default size as md', () => {
    expect(component.size()).toBe('md');
  });

  it('should have default disabled as false', () => {
    expect(component.disabled()).toBe(false);
  });

  it('should apply primary variant classes', () => {
    fixture.componentRef.setInput('variant', 'primary');
    fixture.detectChanges();
    const classes = component.buttonClasses;
    expect(classes).toContain('bg-emerald-600');
    expect(classes).toContain('text-white');
  });

  it('should apply secondary variant classes', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();
    const classes = component.buttonClasses;
    expect(classes).toContain('bg-slate-700');
    expect(classes).toContain('text-slate-100');
  });

  it('should apply danger variant classes', () => {
    fixture.componentRef.setInput('variant', 'danger');
    fixture.detectChanges();
    const classes = component.buttonClasses;
    expect(classes).toContain('bg-red-600');
    expect(classes).toContain('text-white');
  });

  it('should apply ghost variant classes', () => {
    fixture.componentRef.setInput('variant', 'ghost');
    fixture.detectChanges();
    const classes = component.buttonClasses;
    expect(classes).toContain('bg-transparent');
    expect(classes).toContain('text-slate-300');
  });

  it('should apply small size classes', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    const classes = component.buttonClasses;
    expect(classes).toContain('px-3');
    expect(classes).toContain('py-1.5');
    expect(classes).toContain('text-sm');
  });

  it('should apply large size classes', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const classes = component.buttonClasses;
    expect(classes).toContain('px-6');
    expect(classes).toContain('py-3');
    expect(classes).toContain('text-base');
  });

  it('should apply fab size classes', () => {
    fixture.componentRef.setInput('size', 'fab');
    fixture.detectChanges();
    const classes = component.buttonClasses;
    expect(classes).toContain('w-14');
    expect(classes).toContain('h-14');
    expect(classes).toContain('rounded-full');
    expect(classes).toContain('shadow-lg');
    expect(classes).toContain('flex');
    expect(classes).toContain('items-center');
    expect(classes).toContain('justify-center');
  });

  it('should emit click event when clicked and not disabled', () => {
    const clickSpy = jasmine.createSpy();
    component.click.subscribe(clickSpy);

    fixture.nativeElement.querySelector('button').click();

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should not emit click event when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const clickSpy = jasmine.createSpy();
    component.click.subscribe(clickSpy);

    fixture.nativeElement.querySelector('button').click();

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should disable button when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });
});
