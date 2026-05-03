import { Component, input, output, forwardRef, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  // Inputs
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly id = input<string>('');

  // Outputs
  readonly blur = output<FocusEvent>();
  readonly focus = output<FocusEvent>();

  // Internal value
  value: string = '';

  // ControlValueAccessor callbacks
  private onChange = (val: string) => {};
  private onTouched = () => {};

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(target.value);
  }

  onBlur(event: FocusEvent): void {
    this.onTouched();
    this.blur.emit(event);
  }

  onFocus(event: FocusEvent): void {
    this.focus.emit(event);
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  get inputClasses(): string {
    const baseClasses = 'w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-smooth';
    const disabledClasses = this.disabled() ? 'opacity-50 cursor-not-allowed' : '';
    return `${baseClasses} ${disabledClasses}`.trim();
  }
}
