import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model';
import { Event } from '../models/event.model';

/**
 * Serviço para comunicação com a API de eventos.
 * Consome os endpoints REST do backend.
 */
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private readonly apiUrl = '/api/events';

  constructor(private http: HttpClient) { }

  /**
   * Lista eventos com paginação.
   * 
   * @param page Número da página (começa em 0)
   * @param size Tamanho da página
   * @returns Observable com página de eventos
   */
  list(page: number = 0, size: number = 10): Observable<Page<Event>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Event>>(this.apiUrl, { params });
  }

  /**
   * Busca um evento por ID.
   * 
   * @param id ID do evento
   * @returns Observable com o evento
   */
  getById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  /**
   * Cria um novo evento.
   * 
   * @param event Dados do evento a ser criado
   * @returns Observable com o evento criado
   */
  create(event: Partial<Event>): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  /**
   * Atualiza um evento existente.
   * 
   * @param id ID do evento
   * @param event Dados atualizados do evento
   * @returns Observable com o evento atualizado
   */
  update(id: number, event: Partial<Event>): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  /**
   * Deleta um evento (soft delete).
   * 
   * @param id ID do evento
   * @returns Observable vazio
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

