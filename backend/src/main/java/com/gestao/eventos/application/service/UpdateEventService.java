package com.gestao.eventos.application.service;

import com.gestao.eventos.application.UpdateEventUseCase;
import com.gestao.eventos.application.dto.EventRequest;
import com.gestao.eventos.application.dto.EventResponse;
import com.gestao.eventos.domain.model.Event;
import com.gestao.eventos.domain.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Serviço de aplicação para atualizar um evento.
 * Implementa o caso de uso UpdateEventUseCase.
 */
@Service
@Transactional
public class UpdateEventService implements UpdateEventUseCase {
    
    private final EventRepository eventRepository;
    
    public UpdateEventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }
    
    @Override
    public EventResponse update(Long id, EventRequest request) {
        // Busca o evento existente
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Evento não encontrado com ID: " + id));
        
        // Atualiza os dados do evento usando o método de domínio
        event.update(
                request.title(),
                request.description(),
                request.eventAt(),
                request.location()
        );
        
        // Salva as alterações
        Event updatedEvent = eventRepository.save(event);
        
        // Converte para DTO de resposta
        return toResponse(updatedEvent);
    }
    
    /**
     * Converte Event (domínio) para EventResponse (DTO).
     */
    private EventResponse toResponse(Event event) {
        return new EventResponse(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getEventAt(),
                event.getLocation(),
                event.getCreatedAt()
        );
    }
}

