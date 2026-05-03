import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  // Inputs
  readonly hoverable = input<boolean>(false);
  readonly padding = input<boolean>(true);

  get cardClasses(): string {
    const baseClasses = 'bg-slate-800 border border-slate-700 rounded-lg shadow-card';
    const paddingClasses = this.padding() ? 'p-4' : '';
    const hoverClasses = this.hoverable() ? 'hover:shadow-card-hover hover:border-slate-600 transition-smooth cursor-pointer' : '';
    return `${baseClasses} ${paddingClasses} ${hoverClasses}`.trim();
  }
}
