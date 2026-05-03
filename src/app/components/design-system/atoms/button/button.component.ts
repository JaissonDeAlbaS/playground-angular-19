import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'fab';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  // Inputs
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input<boolean>(false);
  readonly type = input<string>('button');

  // Outputs
  readonly click = output<MouseEvent>();

  // Computed classes based on variant
  getVariantClasses(): string {
    const variant = this.variant();
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm`;
      case 'secondary':
        return `${baseClasses} bg-slate-700 hover:bg-slate-600 text-slate-100 focus:ring-slate-500 border border-slate-600`;
      case 'ghost':
        return `${baseClasses} bg-transparent hover:bg-slate-800 text-slate-300 hover:text-slate-100 focus:ring-slate-500`;
      case 'danger':
        return `${baseClasses} bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm`;
      default:
        return `${baseClasses} bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500`;
    }
  }

  // Computed classes based on size
  getSizeClasses(): string {
    const size = this.size();

    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm rounded-md gap-1.5';
      case 'md':
        return 'px-4 py-2 text-sm rounded-lg gap-2';
      case 'lg':
        return 'px-6 py-3 text-base rounded-lg gap-2';
      case 'fab':
        return 'w-14 h-14 rounded-full shadow-lg flex items-center justify-center';
      default:
        return 'px-4 py-2 text-sm rounded-lg gap-2';
    }
  }

  // Combined classes
  get buttonClasses(): string {
    return `${this.getVariantClasses()} ${this.getSizeClasses()}`;
  }

  onButtonClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.click.emit(event);
    }
  }
}
