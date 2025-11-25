import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event.model';
import { Page } from '../../models/page.model';

/**
 * Componente para listagem de eventos com paginação.
 */
@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="events-container">
      <div class="header">
        <h2>Lista de Eventos</h2>
        <a routerLink="/events/new" class="btn-primary">Novo Evento</a>
      </div>
      
      <div *ngIf="loading" class="loading">Carregando...</div>
      
      <div *ngIf="error" class="error">{{ error }}</div>
      
      <div *ngIf="!loading && !error && eventsPage">
        <div *ngIf="eventsPage.empty" class="empty">
          Nenhum evento encontrado.
        </div>
        
        <div *ngIf="!eventsPage.empty" class="events-grid">
          <div *ngFor="let event of eventsPage.content" class="event-card">
            <h3>{{ event.title }}</h3>
            <p *ngIf="event.description">{{ event.description }}</p>
            <div class="event-info">
              <span><strong>Data:</strong> {{ formatDate(event.eventAt) }}</span>
              <span><strong>Local:</strong> {{ event.location }}</span>
            </div>
            <div class="actions">
              <a [routerLink]="['/events', event.id]" class="btn-link">Ver Detalhes</a>
              <a [routerLink]="['/events', event.id, 'edit']" class="btn-link">Editar</a>
            </div>
          </div>
        </div>
        
        <div *ngIf="!eventsPage.empty" class="pagination">
          <button 
            (click)="previousPage()" 
            [disabled]="eventsPage.first"
            class="btn">
            Anterior
          </button>
          <span class="page-info">
            Página {{ eventsPage.number + 1 }} de {{ eventsPage.totalPages }}
            ({{ eventsPage.totalElements }} eventos)
          </span>
          <button 
            (click)="nextPage()" 
            [disabled]="eventsPage.last"
            class="btn">
            Próxima
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .events-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .btn-primary {
      background-color: #3f51b5;
      color: white;
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 500;
    }
    .btn-primary:hover {
      background-color: #303f9f;
    }
    .loading, .error, .empty {
      text-align: center;
      padding: 2rem;
    }
    .error {
      color: #f44336;
    }
    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .event-card {
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      padding: 1.5rem;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .event-card h3 {
      margin-top: 0;
      color: #3f51b5;
    }
    .event-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin: 1rem 0;
      font-size: 0.9rem;
      color: #666;
    }
    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
    .btn-link {
      color: #3f51b5;
      text-decoration: none;
      font-weight: 500;
    }
    .btn-link:hover {
      text-decoration: underline;
    }
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-top: 2rem;
    }
    .btn {
      padding: 0.5rem 1rem;
      border: 1px solid #3f51b5;
      background: white;
      color: #3f51b5;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn:hover:not(:disabled) {
      background-color: #3f51b5;
      color: white;
    }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .page-info {
      font-size: 0.9rem;
      color: #666;
    }
  `]
})
export class EventsListComponent implements OnInit {
  eventsPage: Page<Event> | null = null;
  loading = false;
  error: string | null = null;
  currentPage = 0;
  pageSize = 10;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.error = null;
    
    this.eventsService.list(this.currentPage, this.pageSize).subscribe({
      next: (page) => {
        this.eventsPage = page;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar eventos. Tente novamente.';
        console.error('Erro ao carregar eventos:', err);
        this.loading = false;
      }
    });
  }

  nextPage(): void {
    if (this.eventsPage && !this.eventsPage.last) {
      this.currentPage++;
      this.loadEvents();
    }
  }

  previousPage(): void {
    if (this.eventsPage && !this.eventsPage.first) {
      this.currentPage--;
      this.loadEvents();
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

