package com.gestao.eventos.domain.model;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Entidade de domínio Event - representa um evento no sistema.
 */
public class Event {
    
    private Long id;
    private String title;
    private String description;
    private LocalDateTime eventAt;
    private String location;
    private boolean deleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Construtor privado para forçar uso dos métodos de criação
    private Event() {
        this.deleted = false;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Factory method para criar um novo evento.
     * 
     * @param title Título do evento (obrigatório, máximo 100 caracteres)
     * @param description Descrição do evento (máximo 1000 caracteres)
     * @param eventAt Data e hora do evento (obrigatório, não pode ser no passado)
     * @param location Local do evento (máximo 200 caracteres)
     * @return Nova instância de Event
     * @throws IllegalArgumentException se os dados forem inválidos
     */
    public static Event create(String title, String description, LocalDateTime eventAt, String location) {
        Event event = new Event();
        event.setTitle(title);
        event.setDescription(description);
        event.setEventAt(eventAt);
        event.setLocation(location);
        return event;
    }

    
    /**
     * Atualiza os dados do evento.
     */
    public void update(String title, String description, LocalDateTime eventAt, String location) {
        this.setTitle(title);
        this.setDescription(description);
        this.setEventAt(eventAt);
        this.setLocation(location);
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * Soft delete.
     */
    public void markAsDeleted() {
        this.deleted = true;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * Restaura um evento deletado.
     */
    public void restore() {
        this.deleted = false;
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters
    public Long getId() {
        return id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public LocalDateTime getEventAt() {
        return eventAt;
    }
    
    public String getLocation() {
        return location;
    }
    
    public boolean isDeleted() {
        return deleted;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    // Setters com validação
    private void setTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Title não pode ser nulo ou vazio");
        }
        if (title.length() > 100) {
            throw new IllegalArgumentException("Title não pode ter mais de 100 caracteres");
        }
        this.title = title.trim();
    }
    
    private void setDescription(String description) {
        if (description != null && description.length() > 1000) {
            throw new IllegalArgumentException("Description não pode ter mais de 1000 caracteres");
        }
        this.description = description != null ? description.trim() : null;
    }
    
    private void setEventAt(LocalDateTime eventAt) {
        if (eventAt == null) {
            throw new IllegalArgumentException("EventAt não pode ser nulo");
        }
        if (eventAt.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("EventAt não pode ser no passado");
        }
        this.eventAt = eventAt;
    }
    
    private void setLocation(String location) {
        if (location != null && location.length() > 200) {
            throw new IllegalArgumentException("Location não pode ter mais de 200 caracteres");
        }
        this.location = location != null ? location.trim() : null;
    }
    
    // Métodos utilitários
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return Objects.equals(id, event.id);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
    
    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", eventAt=" + eventAt +
                ", location='" + location + '\'' +
                ", deleted=" + deleted +
                '}';
    }
}

