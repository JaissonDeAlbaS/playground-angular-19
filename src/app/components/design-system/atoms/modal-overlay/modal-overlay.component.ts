import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-overlay.component.html',
  styleUrl: './modal-overlay.component.css'
})
export class ModalOverlayComponent {
  // Inputs
  readonly visible = input<boolean>(false);
  readonly title = input<string>('');

  // Outputs
  readonly close = output<void>();

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close.emit();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close.emit();
    }
  }
}
