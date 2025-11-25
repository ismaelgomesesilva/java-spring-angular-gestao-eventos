package com.gestao.eventos.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuração do OpenAPI (Swagger).
 * Define informações da API para documentação automática.
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Gestão de Eventos API")
                        .version("1.0.0")
                        .description("API RESTful para gerenciamento de eventos. " +
                                "Permite criar, listar, atualizar e excluir eventos do sistema. " +
                                "Desenvolvida com Spring Boot, DDD e Arquitetura Hexagonal.")
                        .contact(new Contact()
                                .name("Sistema de Gestão de Eventos")
                                .email("contato@gestao-eventos.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html")));
    }
}

