package com.gestao.eventos.application.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

/**
 * DTO de requisição para criação/atualização de eventos.
 */
public record EventRequest(

        @NotBlank(message = "Title é obrigatório")
        @Size(max = 100, message = "Title não pode ter mais de 100 caracteres")
        String title,

        @Size(max = 1000, message = "Description não pode ter mais de 1000 caracteres")
        String description,

        @FutureOrPresent(message = "EventAt deve ser uma data futura ou presente")
        LocalDateTime eventAt,

        @NotBlank(message = "Location é obrigatório")
        @Size(max = 200, message = "Location não pode ter mais de 200 caracteres")
        String location

) {}
