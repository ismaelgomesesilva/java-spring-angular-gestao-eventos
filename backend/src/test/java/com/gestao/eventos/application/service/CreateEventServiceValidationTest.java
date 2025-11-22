package com.gestao.eventos.application.service;

import com.gestao.eventos.application.dto.EventRequest;
import com.gestao.eventos.domain.model.Event;
import com.gestao.eventos.domain.repository.EventRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

/**
 * Testes unitários para validações do CreateEventService.
 * Testa os casos de erro e validações de domínio.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("CreateEventService - Testes de Validação")
class CreateEventServiceValidationTest {

    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private CreateEventService createEventService;

    @Test
    @DisplayName("Deve lançar IllegalArgumentException quando título é vazio")
    void deveLancarExcecaoQuandoTituloVazio() {
        // Given
        EventRequest requestTituloVazio = new EventRequest(
                "",
                "Descrição válida",
                LocalDateTime.now().plusDays(1),
                "Local válido"
        );

        // When/Then
        assertThatThrownBy(() -> createEventService.create(requestTituloVazio))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Title não pode ser nulo ou vazio");

        // Verifica que repository.save NÃO foi chamado
        verify(eventRepository, never()).save(any(Event.class));
    }

    @Test
    @DisplayName("Deve lançar IllegalArgumentException quando título é null")
    void deveLancarExcecaoQuandoTituloNull() {
        // Given
        EventRequest requestTituloNull = new EventRequest(
                null,
                "Descrição válida",
                LocalDateTime.now().plusDays(1),
                "Local válido"
        );

        // When/Then
        assertThatThrownBy(() -> createEventService.create(requestTituloNull))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Title não pode ser nulo ou vazio");

        verify(eventRepository, never()).save(any(Event.class));
    }

    @Test
    @DisplayName("Deve lançar IllegalArgumentException quando título tem mais de 100 caracteres")
    void deveLancarExcecaoQuandoTituloMuitoLongo() {
        // Given
        String tituloLongo = "A".repeat(101);
        EventRequest requestTituloLongo = new EventRequest(
                tituloLongo,
                "Descrição válida",
                LocalDateTime.now().plusDays(1),
                "Local válido"
        );

        // When/Then
        assertThatThrownBy(() -> createEventService.create(requestTituloLongo))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Title não pode ter mais de 100 caracteres");

        verify(eventRepository, never()).save(any(Event.class));
    }

    @Test
    @DisplayName("Deve lançar IllegalArgumentException quando eventAt é no passado")
    void deveLancarExcecaoQuandoEventAtPassado() {
        // Given
        EventRequest requestDataPassado = new EventRequest(
                "Título válido",
                "Descrição válida",
                LocalDateTime.now().minusDays(1),
                "Local válido"
        );

        // When/Then
        assertThatThrownBy(() -> createEventService.create(requestDataPassado))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("EventAt não pode ser no passado");

        verify(eventRepository, never()).save(any(Event.class));
    }

    @Test
    @DisplayName("Deve lançar IllegalArgumentException quando eventAt é null")
    void deveLancarExcecaoQuandoEventAtNull() {
        // Given
        EventRequest requestDataNull = new EventRequest(
                "Título válido",
                "Descrição válida",
                null,
                "Local válido"
        );

        // When/Then
        assertThatThrownBy(() -> createEventService.create(requestDataNull))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("EventAt não pode ser nulo");

        verify(eventRepository, never()).save(any(Event.class));
    }
}

