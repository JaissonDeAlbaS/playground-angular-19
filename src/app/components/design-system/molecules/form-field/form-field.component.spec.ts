import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldComponent } from './form-field.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display label when label is empty', () => {
    fixture.componentRef.setInput('label', '');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('label');
    expect(label).toBeNull();
  });

  it('should display label when provided', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('label');
    expect(label).not.toBeNull();
    expect(label.textContent.trim()).toContain('Test Label');
  });

  it('should show required indicator when required is true', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    const requiredSpan = fixture.nativeElement.querySelector('span.text-red-400');
    expect(requiredSpan).not.toBeNull();
  });

  it('should not show required indicator when required is false', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('required', false);
    fixture.detectChanges();

    const requiredSpan = fixture.nativeElement.querySelector('span.text-red-400');
    expect(requiredSpan).toBeNull();
  });

  it('should display error message when error is provided', () => {
    fixture.componentRef.setInput('error', 'This field is required');
    fixture.detectChanges();

    const errorParagraph = fixture.nativeElement.querySelector('p.text-red-400');
    expect(errorParagraph).not.toBeNull();
    expect(errorParagraph.textContent).toContain('This field is required');
  });

  it('should not display error message when error is empty', () => {
    fixture.componentRef.setInput('error', '');
    fixture.detectChanges();

    const errorParagraph = fixture.nativeElement.querySelector('p.text-red-400');
    expect(errorParagraph).toBeNull();
  });

  it('should emit labelClick event when label is clicked', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();

    const labelClickSpy = jasmine.createSpy();
    component.labelClick.subscribe(labelClickSpy);

    const label = fixture.nativeElement.querySelector('label');
    label.click();

    expect(labelClickSpy).toHaveBeenCalled();
  });

  it('should set for attribute on label', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('for', 'test-input');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('label');
    expect(label.getAttribute('for')).toBe('test-input');
  });

  it('should project content correctly', () => {
    // Create a wrapper component to test content projection
    @Component({
      template: `
        <app-form-field>
          <input class="test-content" value="Test Input Content" />
        </app-form-field>
      `,
      imports: [FormFieldComponent]
    })
    class TestHostComponent {}

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    const testFixture = TestBed.createComponent(TestHostComponent);
    testFixture.detectChanges();

    const projectedInput = testFixture.nativeElement.querySelector('.test-content');
    expect(projectedInput).not.toBeNull();
    expect(projectedInput.value).toBe('Test Input Content');
  });
});
