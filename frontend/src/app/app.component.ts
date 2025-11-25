import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="app-container">
      <header>
        <h1>Gestão de Eventos</h1>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      background-color: #3f51b5;
      color: white;
      padding: 1rem 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    header h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    main {
      flex: 1;
      padding: 2rem;
    }
  `]
})
export class AppComponent {
  title = 'gestao-eventos';
}

