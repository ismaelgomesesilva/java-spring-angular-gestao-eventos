-- Migration: Insert sample events
-- Description: Insere 25 eventos de exemplo com dados aleatórios em português para demonstração da paginação

INSERT INTO events (title, description, event_at, location, deleted, created_at, updated_at) VALUES
('Conferência de Tecnologia 2024', 'Evento sobre as últimas tendências em tecnologia, inteligência artificial e inovação digital', '2024-12-15 09:00:00', 'Centro de Convenções Anhembi - São Paulo', false, NOW(), NOW()),
('Workshop de Desenvolvimento Ágil', 'Aprenda metodologias ágeis, Scrum e Kanban na prática com especialistas do mercado', '2024-12-20 14:00:00', 'Hotel Transamérica - São Paulo', false, NOW(), NOW()),
('Meetup de Python Brasil', 'Encontro da comunidade Python para networking e discussão de projetos open source', '2024-12-10 19:00:00', 'WeWork Paulista - São Paulo', false, NOW(), NOW()),
('Festival de Música Eletrônica', 'Festival com os maiores DJs do mundo e shows de música eletrônica', '2024-12-25 20:00:00', 'Parque Ibirapuera - São Paulo', false, NOW(), NOW()),
('Curso de Marketing Digital', 'Aprenda estratégias de marketing digital, SEO, redes sociais e Google Ads', '2024-12-18 10:00:00', 'Centro de Treinamento Digital - Rio de Janeiro', false, NOW(), NOW()),
('Feira de Empreendedorismo', 'Feira com startups, investidores e palestras sobre empreendedorismo e inovação', '2024-12-22 08:00:00', 'Centro de Exposições - Belo Horizonte', false, NOW(), NOW()),
('Seminário de Segurança da Informação', 'Seminário sobre cibersegurança, proteção de dados e LGPD', '2024-12-12 13:30:00', 'Auditório FGV - São Paulo', false, NOW(), NOW()),
('Hackathon de Inovação', 'Maratona de programação de 48 horas para desenvolver soluções inovadoras', '2024-12-28 09:00:00', 'Campus da USP - São Paulo', false, NOW(), NOW()),
('Palestra sobre Inteligência Artificial', 'Palestra sobre IA generativa, ChatGPT e o futuro da tecnologia', '2024-12-16 15:00:00', 'Teatro Municipal - São Paulo', false, NOW(), NOW()),
('Workshop de UX/UI Design', 'Aprenda design de interfaces, prototipação e ferramentas como Figma', '2024-12-19 14:00:00', 'Escola de Design - São Paulo', false, NOW(), NOW()),
('Conferência de Cloud Computing', 'Evento sobre AWS, Azure, Google Cloud e arquitetura de sistemas na nuvem', '2024-12-14 10:00:00', 'Centro de Convenções Rebouças - São Paulo', false, NOW(), NOW()),
('Festival de Gastronomia', 'Festival com chefs renomados, degustações e workshops de culinária', '2024-12-21 12:00:00', 'Parque Villa-Lobos - São Paulo', false, NOW(), NOW()),
('Curso de React e Next.js', 'Curso prático de desenvolvimento frontend com React, Next.js e TypeScript', '2024-12-17 09:00:00', 'Alura - São Paulo', false, NOW(), NOW()),
('Encontro de DevOps', 'Meetup sobre CI/CD, Docker, Kubernetes e práticas de DevOps', '2024-12-11 19:00:00', 'Cubo Itaú - São Paulo', false, NOW(), NOW()),
('Maratona de Programação', 'Competição de programação com desafios de algoritmos e estruturas de dados', '2024-12-13 08:00:00', 'Instituto de Matemática - USP', false, NOW(), NOW()),
('Seminário de Blockchain', 'Seminário sobre blockchain, criptomoedas e Web3', '2024-12-23 14:00:00', 'Centro de Inovação - São Paulo', false, NOW(), NOW()),
('Workshop de Machine Learning', 'Workshop prático sobre machine learning, deep learning e data science', '2024-12-24 10:00:00', 'Laboratório de IA - Unicamp', false, NOW(), NOW()),
('Feira de Carreiras Tech', 'Feira de recrutamento com as maiores empresas de tecnologia do Brasil', '2024-12-26 09:00:00', 'Centro de Convenções - São Paulo', false, NOW(), NOW()),
('Conferência de Mobile Development', 'Evento sobre desenvolvimento mobile, React Native, Flutter e Swift', '2024-12-27 13:00:00', 'Hotel Renaissance - São Paulo', false, NOW(), NOW()),
('Meetup de Java', 'Encontro da comunidade Java para discussão de frameworks e boas práticas', '2024-12-29 19:00:00', 'Thoughtworks - São Paulo', false, NOW(), NOW()),
('Workshop de Testes Automatizados', 'Aprenda testes unitários, integração e E2E com Jest, Cypress e Selenium', '2024-12-30 14:00:00', 'Escola de Testes - São Paulo', false, NOW(), NOW()),
('Seminário de Arquitetura de Software', 'Seminário sobre arquitetura limpa, DDD, microserviços e padrões de design', '2025-01-05 10:00:00', 'Auditório FECAP - São Paulo', false, NOW(), NOW()),
('Festival de Cinema Independente', 'Festival com exibição de filmes independentes e debates com diretores', '2025-01-10 18:00:00', 'Cine Belas Artes - São Paulo', false, NOW(), NOW()),
('Curso de Node.js Avançado', 'Curso avançado de Node.js, Express, GraphQL e arquitetura de APIs', '2025-01-08 09:00:00', 'Rocketseat - São Paulo', false, NOW(), NOW()),
('Conferência de Startups', 'Conferência com fundadores de startups unicórnio e investidores anjo', '2025-01-12 08:00:00', 'Cubo Itaú - São Paulo', false, NOW(), NOW());

