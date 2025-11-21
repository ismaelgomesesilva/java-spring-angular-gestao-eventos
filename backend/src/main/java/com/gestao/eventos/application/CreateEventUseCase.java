package com.gestao.eventos.application;

import com.gestao.eventos.application.dto.EventRequest;
import com.gestao.eventos.application.dto.EventResponse;

/**
 * Caso de uso para criação de eventos.
 * Interface que define o contrato para criação de eventos no sistema.
 */
public interface CreateEventUseCase {
    
    /**
     * Cria um novo evento no sistema.
     * 
     * @param request DTO com os dados do evento a ser criado
     * @return DTO com os dados do evento criado
     */
    EventResponse create(EventRequest request);
}

