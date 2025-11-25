package com.gestao.eventos.application;

import com.gestao.eventos.application.dto.EventRequest;
import com.gestao.eventos.application.dto.EventResponse;

/**
 * Caso de uso para atualizar um evento.
 */
public interface UpdateEventUseCase {
    
    /**
     * Atualiza um evento existente.
     * 
     * @param id ID do evento a ser atualizado
     * @param request DTO com os novos dados do evento
     * @return DTO com os dados do evento atualizado
     * @throws com.gestao.eventos.domain.exception.EventNotFoundException se o evento não for encontrado
     */
    EventResponse update(Long id, EventRequest request);
}

