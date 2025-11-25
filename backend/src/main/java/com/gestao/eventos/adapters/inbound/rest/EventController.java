package com.gestao.eventos.adapters.inbound.rest;

import com.gestao.eventos.application.CreateEventUseCase;
import com.gestao.eventos.application.DeleteEventUseCase;
import com.gestao.eventos.application.GetEventUseCase;
import com.gestao.eventos.application.ListEventsUseCase;
import com.gestao.eventos.application.UpdateEventUseCase;
import com.gestao.eventos.application.dto.EventRequest;
import com.gestao.eventos.application.dto.EventResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller REST para gerenciamento de eventos.
 */
@Tag(name = "Events", description = "API para gerenciamento de eventos")
@RestController
@RequestMapping("/api/events")
public class EventController {
    
    private final CreateEventUseCase createEventUseCase;
    private final GetEventUseCase getEventUseCase;
    private final ListEventsUseCase listEventsUseCase;
    private final UpdateEventUseCase updateEventUseCase;
    private final DeleteEventUseCase deleteEventUseCase;
    
    public EventController(
            CreateEventUseCase createEventUseCase,
            GetEventUseCase getEventUseCase,
            ListEventsUseCase listEventsUseCase,
            UpdateEventUseCase updateEventUseCase,
            DeleteEventUseCase deleteEventUseCase) {
        this.createEventUseCase = createEventUseCase;
        this.getEventUseCase = getEventUseCase;
        this.listEventsUseCase = listEventsUseCase;
        this.updateEventUseCase = updateEventUseCase;
        this.deleteEventUseCase = deleteEventUseCase;
    }
    
    /**
     * Lista eventos com paginação.
     * 
     * @param pageable Configuração de paginação (page, size)
     * @return Página de eventos
     */
    @Operation(summary = "Lista eventos", description = "Retorna uma página de eventos com paginação")
    @GetMapping
    public ResponseEntity<Page<EventResponse>> list(
            @Parameter(description = "Configuração de paginação (page, size)") 
            Pageable pageable
    ) {
        Page<EventResponse> events = listEventsUseCase.list(pageable);
        return ResponseEntity.ok(events);
    }
    
    /**
     * Busca um evento por ID.
     * 
     * @param id ID do evento
     * @return Dados do evento
     */
    @Operation(summary = "Busca evento por ID", description = "Retorna os dados de um evento específico")
    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getById(
            @Parameter(description = "ID do evento") 
            @PathVariable 
            Long id
    ) {
        EventResponse event = getEventUseCase.getById(id);
        return ResponseEntity.ok(event);
    }
    
    /**
     * Cria um novo evento.
     * 
     * @param request DTO com os dados do evento
     * @return Dados do evento criado
     */
    @Operation(summary = "Cria novo evento", description = "Cria um novo evento no sistema")
    @PostMapping
    public ResponseEntity<EventResponse> create(
        @Valid 
        @RequestBody 
        EventRequest request
    ) {
        EventResponse event = createEventUseCase.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(event);
    }
    
    /**
     * Atualiza um evento existente.
     * 
     * @param id ID do evento
     * @param request DTO com os novos dados do evento
     * @return Dados do evento atualizado
     */
    @Operation(summary = "Atualiza evento", description = "Atualiza os dados de um evento existente")
    @PutMapping("/{id}")
    public ResponseEntity<EventResponse> update(
            @Parameter(description = "ID do evento") 
            @PathVariable 
            Long id,

            @Valid 
            @RequestBody 
            EventRequest request
    ) {
        EventResponse event = updateEventUseCase.update(id, request);
        return ResponseEntity.ok(event);
    }
    
    /**
     * Deleta um evento (soft delete).
     * 
     * @param id ID do evento
     * @return No content
     */
    @Operation(summary = "Deleta evento", description = "Realiza soft delete de um evento (marca como deletado)")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "ID do evento") 
            @PathVariable 
            Long id
    ) {
        deleteEventUseCase.delete(id);
        return ResponseEntity.noContent().build();
    }
}

