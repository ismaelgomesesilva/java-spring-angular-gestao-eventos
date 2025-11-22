package com.gestao.eventos.application.service;

import com.gestao.eventos.application.dto.EventRequest;
import com.gestao.eventos.application.dto.EventResponse;
import com.gestao.eventos.domain.model.Event;
import com.gestao.eventos.domain.repository.EventRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Testes unitários para CreateEventService.
 * Testa a criação de eventos válidos.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("CreateEventService - Testes Unitários")
class CreateEventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private CreateEventService createEventService;

    private EventRequest validRequest;
    private Event savedEvent;

    @BeforeEach
    void setUp() {
        LocalDateTime futureDate = LocalDateTime.now().plusDays(1);
        
        validRequest = new EventRequest(
                "Workshop de Spring Boot",
                "Workshop sobre Spring Boot e DDD",
                futureDate,
                "Sala 101 - Campus Central"
        );

        savedEvent = Event.reconstruct(
                1L,
                "Workshop de Spring Boot",
                "Workshop sobre Spring Boot e DDD",
                futureDate,
                "Sala 101 - Campus Central",
                false,
                LocalDateTime.now(),
                LocalDateTime.now()
        );
    }

    @Test
    @DisplayName("Deve criar evento válido e chamar repository.save")
    void deveCriarEventoValido() {
        // Given
        when(eventRepository.save(any(Event.class))).thenReturn(savedEvent);

        // When
        EventResponse response = createEventService.create(validRequest);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.id()).isEqualTo(1L);
        assertThat(response.title()).isEqualTo("Workshop de Spring Boot");
        assertThat(response.description()).isEqualTo("Workshop sobre Spring Boot e DDD");
        assertThat(response.location()).isEqualTo("Sala 101 - Campus Central");
        assertThat(response.createdAt()).isNotNull();

        // Verifica que repository.save foi chamado exatamente uma vez
        verify(eventRepository, times(1)).save(any(Event.class));
        verifyNoMoreInteractions(eventRepository);
    }

    @Test
    @DisplayName("Deve criar evento sem descrição")
    void deveCriarEventoSemDescricao() {
        // Given
        EventRequest requestSemDescricao = new EventRequest(
                "Evento sem descrição",
                null,
                LocalDateTime.now().plusDays(1),
                "Local do evento"
        );

        Event eventSalvo = Event.reconstruct(
                2L,
                "Evento sem descrição",
                null,
                LocalDateTime.now().plusDays(1),
                "Local do evento",
                false,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        when(eventRepository.save(any(Event.class))).thenReturn(eventSalvo);

        // When
        EventResponse response = createEventService.create(requestSemDescricao);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.description()).isNull();
        verify(eventRepository, times(1)).save(any(Event.class));
    }
}

