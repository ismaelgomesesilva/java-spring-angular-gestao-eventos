import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    MatProgressSpinnerModule
  ],
  template: `
    <div class="events-container">
      <div class="header">
        <h2>Lista de Eventos</h2>
        <a routerLink="/events/new" mat-raised-button color="primary">Novo Evento</a>
      </div>
      
      <mat-spinner *ngIf="loading" diameter="50" class="spinner"></mat-spinner>
      
      <div *ngIf="error" class="error">{{ error }}</div>
      
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
    .spinner {
      margin: 2rem auto;
      display: block;
    }
    .error, .empty {
      text-align: center;
      padding: 2rem;
    }
    .error {
      color: #f44336;
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

