import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

/**
 * Events Feature Module
 * 
 * Módulo de feature para gerenciamento de eventos.
 * Contém componentes, serviços e rotas relacionadas a eventos.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: []
})
export class EventsModule { }

