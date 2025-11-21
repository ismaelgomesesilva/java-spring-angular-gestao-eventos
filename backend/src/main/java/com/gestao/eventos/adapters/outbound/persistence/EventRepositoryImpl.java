package com.gestao.eventos.adapters.outbound.persistence;

import com.gestao.eventos.domain.model.Event;
import com.gestao.eventos.domain.repository.EventRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * Implementação do repositório de eventos.
 * Converte entre EventEntity (infraestrutura) e Event (domínio).
 */
@Component
public class EventRepositoryImpl implements EventRepository {
    
    private final SpringDataEventRepository springDataEventRepository;
    
    public EventRepositoryImpl(SpringDataEventRepository springDataEventRepository) {
        this.springDataEventRepository = springDataEventRepository;
    }
    
    @Override
    public Event save(Event event) {
        EventEntity entity = toEntity(event);
        EventEntity savedEntity = springDataEventRepository.save(entity);
        return toDomain(savedEntity);
    }
    
    @Override
    public Optional<Event> findById(Long id) {
        return springDataEventRepository.findByIdAndDeletedFalse(id)
                .map(this::toDomain);
    }
    
    @Override
    public Page<Event> findAll(Pageable pageable) {
        return springDataEventRepository.findByDeletedFalse(pageable)
                .map(this::toDomain);
    }
    
    @Override
    public boolean existsById(Long id) {
        return springDataEventRepository.findByIdAndDeletedFalse(id).isPresent();
    }
    
    /**
     * Converte Event (domínio) para EventEntity (infraestrutura).
     */
    private EventEntity toEntity(Event event) {
        if (event.getId() == null) {
            // Novo evento
            EventEntity entity = new EventEntity();
            entity.setTitle(event.getTitle());
            entity.setDescription(event.getDescription());
            entity.setEventAt(event.getEventAt());
            entity.setLocation(event.getLocation());
            entity.setDeleted(event.isDeleted());
            return entity;
        } else {
            // Evento existente - busca do banco para preservar timestamps
            // Usa findById (sem filtro deleted) para permitir atualizar eventos deletados (restore)
            EventEntity entity = springDataEventRepository.findById(event.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Evento não encontrado: " + event.getId()));
            entity.setTitle(event.getTitle());
            entity.setDescription(event.getDescription());
            entity.setEventAt(event.getEventAt());
            entity.setLocation(event.getLocation());
            entity.setDeleted(event.isDeleted());
            return entity;
        }
    }
    
    /**
     * Converte EventEntity (infraestrutura) para Event (domínio).
     */
    private Event toDomain(EventEntity entity) {
        return Event.reconstruct(
                entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getEventAt(),
                entity.getLocation(),
                entity.getDeleted(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}

