package com.gestao.eventos.application.service;

import com.gestao.eventos.application.CreateEventUseCase;
import com.gestao.eventos.application.dto.EventRequest;
import com.gestao.eventos.application.dto.EventResponse;
import com.gestao.eventos.domain.model.Event;
import com.gestao.eventos.domain.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Serviço de aplicação para criação de eventos.
 * Implementa o caso de uso CreateEventUseCase.
 */
@Service
@Transactional
public class CreateEventService implements CreateEventUseCase {
    
    private final EventRepository eventRepository;
    
    public CreateEventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }
    
    @Override
    public EventResponse create(EventRequest request) {
        // Cria a entidade de domínio usando o factory method
        Event event = Event.create(
                request.title(),
                request.description(),
                request.eventAt(),
                request.location()
        );
        
        // Salva usando o repository port (abstração do domínio)
        Event savedEvent = eventRepository.save(event);
        
        // Converte de volta para DTO de resposta
        return toResponse(savedEvent);
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

