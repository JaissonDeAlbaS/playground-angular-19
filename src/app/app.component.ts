import { Component, signal } from '@angular/core';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { BacklogListComponent } from './components/backlog-list/backlog-list.component';

type ViewMode = 'kanban' | 'backlog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KanbanBoardComponent, BacklogListComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <!-- View Toggle -->
      <div class="fixed top-4 right-4 z-50 flex bg-slate-800/80 backdrop-blur-sm rounded-lg p-1 border border-slate-700">
        <button 
          (click)="setView('kanban')"
          [class.bg-slate-700]="currentView() === 'kanban'"
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
          [class.text-white]="currentView() === 'kanban'"
          [class.text-slate-400]="currentView() !== 'kanban'"
        >
          Kanban
        </button>
        <button 
          (click)="setView('backlog')"
          [class.bg-slate-700]="currentView() === 'backlog'"
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
          [class.text-white]="currentView() === 'backlog'"
          [class.text-slate-400]="currentView() !== 'backlog'"
        >
          Backlog
        </button>
      </div>

      @switch (currentView()) {
        @case ('kanban') {
          <app-kanban-board />
        }
        @case ('backlog') {
          <app-backlog-list />
        }
      }
    </div>
  `,
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
