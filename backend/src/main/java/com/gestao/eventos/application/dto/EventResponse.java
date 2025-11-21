package com.gestao.eventos.application.dto;

import java.time.LocalDateTime;

/**
 * DTO de resposta para eventos.
 */
public record EventResponse(
        Long id,
        String title,
        String description,
        LocalDateTime eventAt,
        String location,
        LocalDateTime createdAt
) {}
