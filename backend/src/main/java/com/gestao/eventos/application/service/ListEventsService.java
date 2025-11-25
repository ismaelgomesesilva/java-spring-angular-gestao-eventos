package com.gestao.eventos.application.service;

import com.gestao.eventos.application.ListEventsUseCase;
import com.gestao.eventos.application.dto.EventResponse;
import com.gestao.eventos.domain.model.Event;
import com.gestao.eventos.domain.repository.EventRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Serviço de aplicação para listar eventos com paginação.
 * Implementa o caso de uso ListEventsUseCase.
 */
@Service
@Transactional(readOnly = true)
public class ListEventsService implements ListEventsUseCase {
    
    private final EventRepository eventRepository;
    
    public ListEventsService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }
    
    @Override
    public Page<EventResponse> list(Pageable pageable) {
        Page<Event> events = eventRepository.findAll(pageable);
        return events.map(this::toResponse);
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

