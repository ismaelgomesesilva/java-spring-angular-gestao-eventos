package com.gestao.eventos.domain.repository;

import com.gestao.eventos.domain.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Interface do repositório de eventos no domínio.
 * Define o contrato para persistência de eventos sem dependências de infraestrutura.
 */
public interface EventRepository {
    
    /**
     * Salva um evento (cria ou atualiza).
     * 
     * @param event Evento a ser salvo
     * @return Evento salvo com ID
     */
    Event save(Event event);
    
    /**
     * Busca um evento por ID (apenas não deletados).
     * 
     * @param id ID do evento
     * @return Optional com o evento se encontrado
     */
    Optional<Event> findById(Long id);
    
    /**
     * Lista eventos não deletados com paginação.
     * 
     * @param pageable Configuração de paginação
     * @return Página de eventos
     */
    Page<Event> findAll(Pageable pageable);
    
    /**
     * Verifica se um evento existe e não está deletado.
     * 
     * @param id ID do evento
     * @return true se existe e não está deletado
     */
    boolean existsById(Long id);
}

