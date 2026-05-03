import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css'
})
export class FormFieldComponent {
  // Inputs
  readonly label = input<string>('');
  readonly error = input<string>('');
  readonly required = input<boolean>(false);
  readonly for = input<string>('');

  // Outputs
  readonly labelClick = output<MouseEvent>();

  onLabelClick(event: MouseEvent): void {
    this.labelClick.emit(event);
  }
}
