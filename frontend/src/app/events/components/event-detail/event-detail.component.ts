import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event.model';

/**
 * Componente para exibir detalhes de um evento.
 */
@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="detail-container">
      <div *ngIf="loading" class="loading">Carregando...</div>
      
      <div *ngIf="error" class="error">{{ error }}</div>
      
      <div *ngIf="!loading && !error && event" class="event-detail">
        <div class="header">
          <h2>{{ event.title }}</h2>
          <div class="actions">
            <a [routerLink]="['/events', event.id, 'edit']" class="btn btn-primary">Editar</a>
            <button (click)="deleteEvent()" class="btn btn-danger">Excluir</button>
            <a routerLink="/events" class="btn btn-secondary">Voltar</a>
          </div>
        </div>
        
        <div class="event-info">
          <div class="info-item">
            <strong>Descrição:</strong>
            <p>{{ event.description || 'Sem descrição' }}</p>
          </div>
          
          <div class="info-item">
            <strong>Data e Hora:</strong>
            <p>{{ formatDate(event.eventAt) }}</p>
          </div>
          
          <div class="info-item">
            <strong>Local:</strong>
            <p>{{ event.location }}</p>
          </div>
          
          <div *ngIf="event.createdAt" class="info-item">
            <strong>Criado em:</strong>
            <p>{{ formatDate(event.createdAt) }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-container {
      max-width: 800px;
      margin: 0 auto;
    }
    .loading, .error {
      text-align: center;
      padding: 2rem;
    }
    .error {
      color: #f44336;
    }
    .event-detail {
      background: white;
      padding: 2rem;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #e0e0e0;
    }
    .header h2 {
      margin: 0;
      color: #3f51b5;
    }
    .actions {
      display: flex;
      gap: 1rem;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      text-decoration: none;
      font-size: 1rem;
      cursor: pointer;
      font-weight: 500;
    }
    .btn-primary {
      background-color: #3f51b5;
      color: white;
    }
    .btn-primary:hover {
      background-color: #303f9f;
    }
    .btn-danger {
      background-color: #f44336;
      color: white;
    }
    .btn-danger:hover {
      background-color: #d32f2f;
    }
    .btn-secondary {
      background-color: #f5f5f5;
      color: #333;
    }
    .btn-secondary:hover {
      background-color: #e0e0e0;
    }
    .event-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .info-item {
      padding: 1rem;
      background-color: #f9f9f9;
      border-radius: 4px;
    }
    .info-item strong {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
      font-size: 0.9rem;
      text-transform: uppercase;
    }
    .info-item p {
      margin: 0;
      font-size: 1.1rem;
      color: #333;
    }
  `]
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEvent(+id);
    }
  }

  loadEvent(id: number): void {
    this.loading = true;
    this.error = null;

    this.eventsService.getById(id).subscribe({
      next: (event) => {
        this.event = event;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar evento.';
        console.error('Erro ao carregar evento:', err);
        this.loading = false;
      }
    });
  }

  deleteEvent(): void {
    if (!this.event?.id) return;

    if (confirm('Tem certeza que deseja excluir este evento?')) {
      this.loading = true;
      this.eventsService.delete(this.event.id).subscribe({
        next: () => {
          this.router.navigate(['/events']);
        },
        error: (err) => {
          this.error = 'Erro ao excluir evento.';
          console.error('Erro ao excluir evento:', err);
          this.loading = false;
        }
      });
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

