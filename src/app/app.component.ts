import { Component } from '@angular/core';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KanbanBoardComponent],
  template: '<app-kanban-board />',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  title = 'playground-angular-21';
}
