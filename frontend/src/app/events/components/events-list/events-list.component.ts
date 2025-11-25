import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event.model';
import { Page } from '../../models/page.model';

/**
 * Componente para listagem de eventos com paginação.
 */
@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule
  ],
  template: `
    <div class="events-container">
      <div class="header">
        <h2>Lista de Eventos</h2>
        <a routerLink="/events/new" mat-raised-button color="primary">Novo Evento</a>
      </div>
      
      <div *ngIf="loading" class="loading-container">
        <mat-spinner diameter="60" class="spinner"></mat-spinner>
        <p class="loading-text">Carregando eventos...</p>
      </div>
      
      <div *ngIf="error" class="error-container">
        <mat-icon class="error-icon">error_outline</mat-icon>
        <div class="error-content">
          <h3>Erro ao carregar eventos</h3>
          <p>{{ error }}</p>
          <button mat-raised-button color="primary" (click)="loadEvents()" class="retry-button">
            <mat-icon>refresh</mat-icon>
            Tentar Novamente
          </button>
        </div>
      </div>
      
      <div *ngIf="!loading && !error && eventsPage">
        <div *ngIf="eventsPage.empty" class="empty">
          <p>Nenhum evento encontrado.</p>
          <a routerLink="/events/new" mat-raised-button color="primary">Criar Primeiro Evento</a>
        </div>
        
        <div *ngIf="!eventsPage.empty" class="events-grid">
          <mat-card *ngFor="let event of eventsPage.content" class="event-card">
            <mat-card-header>
              <mat-card-title>{{ event.title }}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p *ngIf="event.description" class="description">{{ event.description }}</p>
              <div class="event-info">
                <p><strong>Data:</strong> {{ formatDate(event.eventAt) }}</p>
                <p><strong>Local:</strong> {{ event.location }}</p>
              </div>
            </mat-card-content>
            <mat-card-actions>
              <a [routerLink]="['/events', event.id]" mat-button color="primary">Ver Detalhes</a>
              <a [routerLink]="['/events', event.id, 'edit']" mat-button>Editar</a>
            </mat-card-actions>
          </mat-card>
        </div>
        
        <mat-paginator
          *ngIf="!eventsPage.empty"
          [length]="eventsPage.totalElements"
          [pageSize]="pageSize"
          [pageIndex]="currentPage"
          [pageSizeOptions]="[5, 10, 20, 50]"
          (page)="onPageChange($event)"
          showFirstLastButtons>
        </mat-paginator>
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
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      gap: 1rem;
    }
    .spinner {
      margin: 0 auto;
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
    }
    .empty {
      text-align: center;
      padding: 2rem;
    }
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .event-card {
      height: 100%;
    }
    .description {
      margin: 1rem 0;
      color: #666;
    }
    .event-info {
      margin: 1rem 0;
      font-size: 0.9rem;
      color: #666;
    }
    .event-info p {
      margin: 0.5rem 0;
    }
    mat-paginator {
      margin-top: 2rem;
    }
  `]
})
export class EventsListComponent implements OnInit {
  eventsPage: Page<Event> | null = null;
  loading = false;
  error: string | null = null;
  currentPage = 0;
  pageSize = 10;

  constructor(
    private eventsService: EventsService,
    private snackBar: MatSnackBar
  ) { }

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
        let errorMessage = 'Erro ao carregar eventos. Verifique sua conexão e tente novamente.';
        
        if (err?.error?.message) {
          errorMessage = err.error.message;
        } else if (err?.message) {
          errorMessage = err.message;
        } else if (err?.status === 0 || err?.statusText === 'Unknown Error') {
          errorMessage = 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.';
        } else if (err?.status >= 500) {
          errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
        } else if (err?.status >= 400) {
          errorMessage = 'Erro na requisição. Verifique os dados e tente novamente.';
        }
        
        this.error = errorMessage;
        console.error('Erro ao carregar eventos:', err);
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

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEvents();
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

