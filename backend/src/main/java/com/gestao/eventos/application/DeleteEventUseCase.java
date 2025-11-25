package com.gestao.eventos.application;

/**
 * Caso de uso para deletar um evento (soft delete).
 */
public interface DeleteEventUseCase {
    
    /**
     * Deleta um evento (soft delete).
     * 
     * @param id ID do evento a ser deletado
     * @throws com.gestao.eventos.domain.exception.EventNotFoundException se o evento não for encontrado
     */
    void delete(Long id);
}

