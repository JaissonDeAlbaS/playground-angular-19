import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeColor = 'slate' | 'emerald' | 'red' | 'amber';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css'
})
export class BadgeComponent {
  // Inputs
  readonly color = input<BadgeColor>('slate');
  readonly text = input<string>('');

  // Computed classes based on color
  getColorClasses(): string {
    const color = this.color();

    switch (color) {
      case 'slate':
        return 'bg-slate-700 text-slate-200 border-slate-600';
      case 'emerald':
        return 'bg-emerald-900/30 text-emerald-400 border-emerald-700/50';
      case 'red':
        return 'bg-red-900/30 text-red-400 border-red-700/50';
      case 'amber':
        return 'bg-amber-900/30 text-amber-400 border-amber-700/50';
      default:
        return 'bg-slate-700 text-slate-200 border-slate-600';
    }
  }

  get badgeClasses(): string {
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${this.getColorClasses()}`;
  }
}
