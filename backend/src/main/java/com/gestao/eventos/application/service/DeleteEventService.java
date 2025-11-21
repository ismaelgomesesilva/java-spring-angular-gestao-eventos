package com.gestao.eventos.application.service;

import com.gestao.eventos.application.DeleteEventUseCase;
import com.gestao.eventos.domain.model.Event;
import com.gestao.eventos.domain.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Serviço de aplicação para deletar um evento (soft delete).
 * Implementa o caso de uso DeleteEventUseCase.
 */
@Service
@Transactional
public class DeleteEventService implements DeleteEventUseCase {
    
    private final EventRepository eventRepository;
    
    public DeleteEventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }
    
    @Override
    public void delete(Long id) {
        // Busca o evento existente
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Evento não encontrado com ID: " + id));
        
        // Marca como deletado usando o método de domínio (soft delete)
        event.markAsDeleted();
        
        // Salva as alterações
        eventRepository.save(event);
    }
}

