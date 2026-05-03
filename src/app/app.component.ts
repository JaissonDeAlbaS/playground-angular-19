import { Component, signal } from '@angular/core';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { BacklogListComponent } from './components/backlog-list/backlog-list.component';

type ViewMode = 'kanban' | 'backlog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KanbanBoardComponent, BacklogListComponent],
  templateUrl: './app.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  currentView = signal<ViewMode>('kanban');

  setView(view: ViewMode) {
    this.currentView.set(view);
  }
}
