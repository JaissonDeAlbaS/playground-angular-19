import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalOverlayComponent } from './modal-overlay.component';
import { CommonModule } from '@angular/common';

describe('ModalOverlayComponent', () => {
  let component: ModalOverlayComponent;
  let fixture: ComponentFixture<ModalOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOverlayComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render when visible is false', () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.modal-overlay');
    expect(overlay).toBeNull();
  });

  it('should render when visible is true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.modal-overlay');
    expect(overlay).not.toBeNull();
  });

  it('should display title when provided', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('title', 'Test Modal');
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent.trim()).toBe('Test Modal');
  });

  it('should not display title section when title is empty', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('title', '');
    fixture.detectChanges();

    const titleSection = fixture.nativeElement.querySelector('.border-b');
    expect(titleSection).toBeNull();
  });

  it('should emit close event on overlay click', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();

    const closeSpy = jasmine.createSpy();
    component.close.subscribe(closeSpy);

    const overlay = fixture.nativeElement.querySelector('.modal-overlay');
    overlay.click();

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should emit close event on Escape key', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();

    const closeSpy = jasmine.createSpy();
    component.close.subscribe(closeSpy);

    const overlay = fixture.nativeElement.querySelector('.modal-overlay');
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    overlay.dispatchEvent(escapeEvent);

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should apply correct overlay classes', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.modal-overlay');
    expect(overlay.classList.contains('fixed')).toBeTrue();
    expect(overlay.classList.contains('inset-0')).toBeTrue();
    expect(overlay.classList.contains('bg-slate-900/80')).toBeTrue();
  });

  it('should apply correct modal classes', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();

    const modal = fixture.nativeElement.querySelector('.bg-slate-800');
    expect(modal.classList.contains('rounded-xl')).toBeTrue();
    expect(modal.classList.contains('shadow-modal')).toBeTrue();
    expect(modal.classList.contains('border-slate-700')).toBeTrue();
  });
});
