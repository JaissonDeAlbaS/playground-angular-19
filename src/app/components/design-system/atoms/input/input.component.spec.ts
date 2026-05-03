import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, CommonModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default type as text', () => {
    expect(component.type()).toBe('text');
  });

  it('should write value via ControlValueAccessor', () => {
    component.writeValue('test value');
    fixture.detectChanges();
    
    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('test value');
  });

  it('should register onChange callback and call it on input', () => {
    const onChangeSpy = jasmine.createSpy();
    component.registerOnChange(onChangeSpy);
    
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'test value';
    input.dispatchEvent(new Event('input'));

    expect(onChangeSpy).toHaveBeenCalledWith('test value');
  });

  it('should register onTouched callback and call it on blur', () => {
    const onTouchedSpy = jasmine.createSpy();
    component.registerOnTouched(onTouchedSpy);
    
    const input = fixture.nativeElement.querySelector('input');
    input.dispatchEvent(new Event('blur'));

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should emit blur event', () => {
    const blurSpy = jasmine.createSpy();
    component.blur.subscribe(blurSpy);

    const input = fixture.nativeElement.querySelector('input');
    input.dispatchEvent(new Event('blur'));

    expect(blurSpy).toHaveBeenCalled();
  });

  it('should emit focus event', () => {
    const focusSpy = jasmine.createSpy();
    component.focus.subscribe(focusSpy);

    const input = fixture.nativeElement.querySelector('input');
    input.dispatchEvent(new Event('focus'));

    expect(focusSpy).toHaveBeenCalled();
  });

  it('should apply disabled attribute when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.disabled).toBe(true);
  });

  it('should display placeholder correctly', () => {
    fixture.componentRef.setInput('placeholder', 'Enter text here');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.placeholder).toBe('Enter text here');
  });

  it('should apply input classes', () => {
    fixture.detectChanges();
    const classes = component.inputClasses;
    expect(classes).toContain('bg-slate-800');
    expect(classes).toContain('border-slate-600');
    expect(classes).toContain('text-slate-100');
    expect(classes).toContain('rounded-lg');
  });

  it('should work with reactive forms', () => {
    // Create a wrapper component with a form control
    @Component({
      template: `
        <form [formGroup]="form">
          <app-input formControlName="testField"></app-input>
        </form>
      `,
      imports: [ReactiveFormsModule, InputComponent]
    })
    class TestHostComponent {
      form = new FormGroup({
        testField: new FormControl('initial value')
      });
    }

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, InputComponent]
    });

    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();

    const input = hostFixture.nativeElement.querySelector('input');
    expect(input.value).toBe('initial value');

    // Update via form control
    hostFixture.componentInstance.form.controls.testField.setValue('new value');
    hostFixture.detectChanges();
    
    expect(input.value).toBe('new value');
  });
});
