import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event.model';

/**
 * Componente para exibir detalhes de um evento.
 */
@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="detail-container">
      <div *ngIf="loading" class="loading-container">
        <mat-spinner diameter="60"></mat-spinner>
        <p class="loading-text">Carregando evento...</p>
      </div>
      
      <div *ngIf="error" class="error-container">
        <mat-icon class="error-icon">error_outline</mat-icon>
        <div class="error-content">
          <h3>Erro ao carregar evento</h3>
          <p>{{ error }}</p>
          <button mat-raised-button color="primary" (click)="reloadEvent()" *ngIf="event?.id" class="retry-button">
            <mat-icon>refresh</mat-icon>
            Tentar Novamente
          </button>
          <a mat-raised-button color="primary" routerLink="/events" class="retry-button">
            <mat-icon>arrow_back</mat-icon>
            Voltar para Lista
          </a>
        </div>
      </div>
      
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
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      gap: 1rem;
    }
    .loading-text {
      color: #666;
      font-size: 1rem;
      margin: 0;
    }
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 2rem;
      background-color: #ffebee;
      border-radius: 8px;
      border: 1px solid #ffcdd2;
      margin: 2rem 0;
    }
    .error-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #f44336;
      margin-bottom: 1rem;
    }
    .error-content {
      text-align: center;
    }
    .error-content h3 {
      color: #d32f2f;
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
    }
    .error-content p {
      color: #666;
      margin: 0 0 1.5rem 0;
    }
    .retry-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0.5rem;
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
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  eventId: number | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventId = +id;
      this.loadEvent(this.eventId);
    }
  }

  reloadEvent(): void {
    if (this.eventId) {
      this.loadEvent(this.eventId);
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
        const errorMessage = err?.error?.message || 'Erro ao carregar evento. Tente novamente.';
        this.error = errorMessage;
        console.error('Erro ao carregar evento:', err);
        this.loading = false;
        
        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  deleteEvent(): void {
    if (!this.event?.id) return;

    if (confirm('Tem certeza que deseja excluir este evento?')) {
      this.loading = true;
      this.eventsService.delete(this.event.id).subscribe({
        next: () => {
          this.snackBar.open('Evento excluído com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          
          this.router.navigate(['/events']);
        },
        error: (err) => {
          const errorMessage = err?.error?.message || 'Erro ao excluir evento. Tente novamente.';
          this.error = errorMessage;
          console.error('Erro ao excluir evento:', err);
          this.loading = false;
          
          this.snackBar.open(errorMessage, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
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

