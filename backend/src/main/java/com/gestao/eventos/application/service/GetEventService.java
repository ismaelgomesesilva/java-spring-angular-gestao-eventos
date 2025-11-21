package com.gestao.eventos.application.service;

import com.gestao.eventos.application.GetEventUseCase;
import com.gestao.eventos.application.dto.EventResponse;
import com.gestao.eventos.domain.model.Event;
import com.gestao.eventos.domain.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Serviço de aplicação para buscar um evento por ID.
 * Implementa o caso de uso GetEventUseCase.
 */
@Service
@Transactional(readOnly = true)
public class GetEventService implements GetEventUseCase {
    
    private final EventRepository eventRepository;
    
    public GetEventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }
    
    @Override
    public EventResponse getById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Evento não encontrado com ID: " + id));
        
        return toResponse(event);
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

