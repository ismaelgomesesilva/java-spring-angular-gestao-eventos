package com.gestao.eventos.application;

import com.gestao.eventos.application.dto.EventResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Caso de uso para listar eventos com paginação.
 */
public interface ListEventsUseCase {
    
    /**
     * Lista eventos com paginação.
     * 
     * @param pageable Configuração de paginação
     * @return Página de eventos
     */
    Page<EventResponse> list(Pageable pageable);
}

