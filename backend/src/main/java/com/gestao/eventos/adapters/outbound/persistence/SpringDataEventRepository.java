package com.gestao.eventos.adapters.outbound.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositório Spring Data JPA para EventEntity.
 */
@Repository
public interface SpringDataEventRepository extends JpaRepository<EventEntity, Long> {
    
    /**
     * Busca eventos não deletados com paginação.
     * 
     * @param pageable Configuração de paginação
     * @return Página de eventos não deletados
     */
    Page<EventEntity> findByDeletedFalse(Pageable pageable);
    
    /**
     * Busca um evento por ID que não esteja deletado.
     * 
     * @param id ID do evento
     * @return Optional com o evento se encontrado e não deletado
     */
    Optional<EventEntity> findByIdAndDeletedFalse(Long id);
}

