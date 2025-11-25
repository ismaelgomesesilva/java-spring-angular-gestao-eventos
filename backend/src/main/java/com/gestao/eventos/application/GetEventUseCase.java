package com.gestao.eventos.application;

import com.gestao.eventos.application.dto.EventResponse;

/**
 * Caso de uso para buscar um evento por ID.
 */
public interface GetEventUseCase {
    
    /**
     * Busca um evento pelo ID.
     * 
     * @param id ID do evento
     * @return DTO com os dados do evento
     * @throws com.gestao.eventos.domain.exception.EventNotFoundException se o evento não for encontrado
     */
    EventResponse getById(Long id);
}

