# Multi-stage build para Angular
# Stage 1: Build da aplicação Angular
FROM node:18 AS build

WORKDIR /app

# Copia arquivos de dependências primeiro (cache layer)
COPY package*.json ./
RUN npm ci

# Copia o código fonte e faz o build
COPY . .
RUN npx ng build --configuration production

# Stage 2: Servir com Nginx
FROM nginx:alpine

# Remove configuração padrão do Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copia configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos buildados do stage anterior
# Angular 17+ gera em dist/[project]/browser, então copiamos de lá
COPY --from=build /app/dist/gestao-eventos/browser /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Nginx inicia automaticamente, mas podemos especificar explicitamente
CMD ["nginx", "-g", "daemon off;"]

