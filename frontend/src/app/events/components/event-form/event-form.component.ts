import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { EventsService } from '../../services/events.service';

/**
 * Componente para criação e edição de eventos.
 */
@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule
  ],
  template: `
    <div class="form-container">
      <h2>{{ isEditMode ? 'Editar Evento' : 'Novo Evento' }}</h2>
      
      <div *ngIf="loading" class="loading-overlay">
        <mat-spinner diameter="60"></mat-spinner>
        <p>Salvando evento...</p>
      </div>
      
      <form [formGroup]="eventForm" (ngSubmit)="onSubmit()" [class.form-loading]="loading">
        <div class="form-group">
          <label for="title">Título *</label>
          <input 
            id="title" 
            type="text" 
            formControlName="title"
            class="form-control"
            [class.error]="eventForm.get('title')?.invalid && eventForm.get('title')?.touched">
          <div *ngIf="eventForm.get('title')?.invalid && eventForm.get('title')?.touched" class="error-message">
            <span *ngIf="eventForm.get('title')?.errors?.['required']">Título é obrigatório</span>
            <span *ngIf="eventForm.get('title')?.errors?.['maxlength']">
              Título não pode ter mais de 100 caracteres
            </span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="description">Descrição</label>
          <textarea 
            id="description" 
            formControlName="description"
            class="form-control"
            rows="4"
            [class.error]="eventForm.get('description')?.invalid && eventForm.get('description')?.touched">
          </textarea>
          <div *ngIf="eventForm.get('description')?.invalid && eventForm.get('description')?.touched" class="error-message">
            Descrição não pode ter mais de 1000 caracteres
          </div>
        </div>
        
        <div class="form-group">
          <label for="eventAt">Data e Hora do Evento *</label>
          <input 
            id="eventAt" 
            type="datetime-local" 
            formControlName="eventAt"
            class="form-control"
            [class.error]="eventForm.get('eventAt')?.invalid && eventForm.get('eventAt')?.touched">
          <div *ngIf="eventForm.get('eventAt')?.invalid && eventForm.get('eventAt')?.touched" class="error-message">
            <span *ngIf="eventForm.get('eventAt')?.errors?.['required']">Data e hora são obrigatórias</span>
            <span *ngIf="eventForm.get('eventAt')?.errors?.['pastDate']">
              Data e hora não podem estar no passado
            </span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="location">Local *</label>
          <input 
            id="location" 
            type="text" 
            formControlName="location"
            class="form-control"
            [class.error]="eventForm.get('location')?.invalid && eventForm.get('location')?.touched">
          <div *ngIf="eventForm.get('location')?.invalid && eventForm.get('location')?.touched" class="error-message">
            Local é obrigatório (máximo 200 caracteres)
          </div>
        </div>
        
        <div *ngIf="error" class="error-alert">
          <mat-icon>error_outline</mat-icon>
          <span>{{ error }}</span>
        </div>
        
        <div class="form-actions">
          <button type="button" (click)="cancel()" class="btn btn-secondary" [disabled]="loading">
            Cancelar
          </button>
          <button type="submit" [disabled]="eventForm.invalid || loading" class="btn btn-primary">
            <mat-spinner *ngIf="loading" diameter="20" class="button-spinner"></mat-spinner>
            <span *ngIf="!loading">{{ isEditMode ? 'Atualizar' : 'Criar' }}</span>
            <span *ngIf="loading">{{ isEditMode ? 'Atualizando...' : 'Criando...' }}</span>
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      padding: 2rem;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: relative;
    }
    .form-loading {
      opacity: 0.6;
      pointer-events: none;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .form-control.error {
      border-color: #f44336;
    }
    .form-control:focus {
      outline: none;
      border-color: #3f51b5;
      box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
    }
    .error-alert {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      background-color: #ffebee;
      border: 1px solid #ffcdd2;
      border-radius: 4px;
      color: #d32f2f;
      margin-bottom: 1rem;
    }
    .error-alert mat-icon {
      color: #f44336;
    }
    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.95);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      border-radius: 4px;
      z-index: 1000;
      backdrop-filter: blur(2px);
    }
    .loading-overlay p {
      margin: 0;
      color: #3f51b5;
      font-size: 1.1rem;
      font-weight: 500;
    }
    .button-spinner {
      display: inline-block;
      margin-right: 0.5rem;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      font-weight: 500;
    }
    .btn-primary {
      background-color: #3f51b5;
      color: white;
    }
    .btn-primary:hover:not(:disabled) {
      background-color: #303f9f;
    }
    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .btn-secondary {
      background-color: #f5f5f5;
      color: #333;
    }
    .btn-secondary:hover {
      background-color: #e0e0e0;
    }
  `]
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  isEditMode = false;
  eventId: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],
      description: ['', [Validators.maxLength(1000)]],
      eventAt: ['', [
        Validators.required,
        this.futureDateValidator
      ]],
      location: ['', [
        Validators.required,
        Validators.maxLength(200)
      ]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.eventId = +id;
      this.loadEvent();
    }
  }

  loadEvent(): void {
    if (!this.eventId) return;

    this.loading = true;
    this.eventsService.getById(this.eventId).subscribe({
      next: (event) => {
        // Converter ISO string para datetime-local format
        const eventDate = new Date(event.eventAt);
        const localDateTime = this.formatDateForInput(eventDate);
        
        this.eventForm.patchValue({
          title: event.title,
          description: event.description || '',
          eventAt: localDateTime,
          location: event.location
        });
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

  onSubmit(): void {
    if (this.eventForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    const formValue = this.eventForm.value;
    // Converter datetime-local para ISO string
    const eventAt = new Date(formValue.eventAt).toISOString();

    const eventData = {
      title: formValue.title,
      description: formValue.description || null,
      eventAt: eventAt,
      location: formValue.location
    };

    const operation = this.isEditMode
      ? this.eventsService.update(this.eventId!, eventData)
      : this.eventsService.create(eventData);

    operation.subscribe({
      next: () => {
        const successMessage = this.isEditMode 
          ? 'Evento atualizado com sucesso!' 
          : 'Evento criado com sucesso!';
        
        this.snackBar.open(successMessage, 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        
        this.router.navigate(['/events']);
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'Erro ao salvar evento. Verifique os dados e tente novamente.';
        this.error = errorMessage;
        console.error('Erro ao salvar evento:', err);
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

  cancel(): void {
    this.router.navigate(['/events']);
  }

  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  /**
   * Validator para verificar se a data não está no passado.
   */
  private futureDateValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Deixa o Validators.required tratar o valor vazio
    }

    const selectedDate = new Date(control.value);
    const now = new Date();
    
    // Compara apenas data e hora (ignora milissegundos)
    now.setMilliseconds(0);
    selectedDate.setMilliseconds(0);

    if (selectedDate < now) {
      return { pastDate: true };
    }

    return null;
  };
}

