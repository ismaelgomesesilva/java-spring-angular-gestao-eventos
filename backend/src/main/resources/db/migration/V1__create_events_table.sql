-- Migration: Create events table
-- Description: Tabela para armazenar eventos do sistema de gestão

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(1000),
    event_at TIMESTAMP NOT NULL,
    location VARCHAR(200),
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX idx_events_deleted ON events(deleted);
CREATE INDEX idx_events_event_at ON events(event_at);
CREATE INDEX idx_events_created_at ON events(created_at);

-- Comentários nas colunas para documentação
COMMENT ON TABLE events IS 'Tabela de eventos do sistema de gestão';
COMMENT ON COLUMN events.id IS 'Identificador único do evento (auto-increment)';
COMMENT ON COLUMN events.title IS 'Título do evento (máximo 100 caracteres)';
COMMENT ON COLUMN events.description IS 'Descrição detalhada do evento (máximo 1000 caracteres)';
COMMENT ON COLUMN events.event_at IS 'Data e hora do evento';
COMMENT ON COLUMN events.location IS 'Local do evento (máximo 200 caracteres)';
COMMENT ON COLUMN events.deleted IS 'Flag para soft delete (não remove fisicamente)';
COMMENT ON COLUMN events.created_at IS 'Data e hora de criação do registro';
COMMENT ON COLUMN events.updated_at IS 'Data e hora da última atualização do registro';

