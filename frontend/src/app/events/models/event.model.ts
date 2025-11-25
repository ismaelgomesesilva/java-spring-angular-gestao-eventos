/**
 * Modelo de Evento.
 * Representa um evento no sistema.
 */
export interface Event {
  id?: number;
  title: string;
  description?: string;
  eventAt: string; // ISO 8601 date-time string
  location: string;
  createdAt?: string; // ISO 8601 date-time string
}

/**
 * DTO para criação/atualização de evento.
 */
export interface EventRequest {
  title: string;
  description?: string;
  eventAt: string; // ISO 8601 date-time string
  location: string;
}

