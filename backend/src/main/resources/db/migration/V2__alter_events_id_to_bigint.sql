-- Migration: Alter events.id to BIGINT
-- Description: Altera o tipo da coluna id de INTEGER (SERIAL) para BIGINT (BIGSERIAL)
-- para compatibilidade com o tipo Long do Java/JPA

-- Verifica se a coluna já não é BIGINT antes de alterar
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'events'
        AND column_name = 'id'
        AND data_type = 'integer'
    ) THEN
        ALTER TABLE events
            ALTER COLUMN id TYPE BIGINT;

        -- Altera a sequência para BIGINT
        ALTER SEQUENCE events_id_seq AS BIGINT;
        
        -- Ajusta o valor da sequência para garantir incrementos corretos
        PERFORM setval('events_id_seq', COALESCE((SELECT MAX(id) FROM events), 1), false);
    END IF;
END $$;

