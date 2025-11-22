package com.gestao.eventos.adapters.inbound.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gestao.eventos.application.dto.EventRequest;
import com.gestao.eventos.application.dto.EventResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Testes de integração para EventController.
 * Testa a integração completa do controller com os serviços e banco de dados.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
@DisplayName("EventController - Testes de Integração")
class EventControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("Deve criar evento via POST e buscar via GET")
    void deveCriarEventoEPorGET() throws Exception {
        // Given
        LocalDateTime futureDate = LocalDateTime.now().plusDays(1);
        EventRequest request = new EventRequest(
                "Workshop de Spring Boot",
                "Workshop sobre Spring Boot e DDD",
                futureDate,
                "Sala 101 - Campus Central"
        );

        // When - POST para criar evento
        String createResponse = mockMvc.perform(post("/api/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.title").value("Workshop de Spring Boot"))
                .andExpect(jsonPath("$.description").value("Workshop sobre Spring Boot e DDD"))
                .andExpect(jsonPath("$.location").value("Sala 101 - Campus Central"))
                .andExpect(jsonPath("$.createdAt").exists())
                .andReturn()
                .getResponse()
                .getContentAsString();

        // Parse do ID do evento criado
        EventResponse createdEvent = objectMapper.readValue(createResponse, EventResponse.class);
        Long eventId = createdEvent.id();

        assertThat(eventId).isNotNull();

        // When - GET para buscar o evento criado
        mockMvc.perform(get("/api/events/{id}", eventId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(eventId))
                .andExpect(jsonPath("$.title").value("Workshop de Spring Boot"))
                .andExpect(jsonPath("$.description").value("Workshop sobre Spring Boot e DDD"))
                .andExpect(jsonPath("$.location").value("Sala 101 - Campus Central"))
                .andExpect(jsonPath("$.createdAt").exists());
    }

    @Test
    @DisplayName("Deve retornar erro 400 quando criar evento com título vazio")
    void deveRetornarErro400ComTituloVazio() throws Exception {
        // Given
        EventRequest requestInvalido = new EventRequest(
                "",
                "Descrição válida",
                LocalDateTime.now().plusDays(1),
                "Local válido"
        );

        // When/Then
        mockMvc.perform(post("/api/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestInvalido)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Deve retornar erro 400 quando criar evento com data no passado")
    void deveRetornarErro400ComDataPassado() throws Exception {
        // Given
        EventRequest requestDataPassado = new EventRequest(
                "Título válido",
                "Descrição válida",
                LocalDateTime.now().minusDays(1),
                "Local válido"
        );

        // When/Then
        mockMvc.perform(post("/api/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDataPassado)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Deve listar eventos com paginação")
    void deveListarEventosComPaginacao() throws Exception {
        // Given - criar um evento primeiro
        EventRequest request = new EventRequest(
                "Evento para Listagem",
                "Descrição",
                LocalDateTime.now().plusDays(1),
                "Local"
        );

        mockMvc.perform(post("/api/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        // When/Then - listar eventos
        mockMvc.perform(get("/api/events")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.totalElements").exists())
                .andExpect(jsonPath("$.pageable").exists());
    }
}

